import { Injectable } from '@angular/core';
// import { getSelectedIndustries } from '..';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import cloneDeep from 'lodash/cloneDeep';
@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  hasQueryParams(params: Record<string, unknown>): boolean {
    return !!params.q;
  }

  getQueryParams<T>(params: T): Record<string, unknown> {
    return this.convertToQueryParams(params);
  }

  getConfig<T>(params: Record<string, string>): T {
    return this.convertFromQueryParams<T>(pick(params, ['sort', 'limit']));
  }
  private convertToQueryParams<T>(data: T): Record<string, unknown> {
    return merge(
      data &&
        Object.entries(data)
          .filter(([, value]) => value)
          .map(([key, value]) => {
            switch (key) {
              case 'sort':
                return { sort: value };
              case 'number':
                return { limit: value };
              case 'prefecture':
                return { pref: !data['hankagai'] ? value.prefCd : '' };
              case 'lineSelected':
                return { line: `${value.roman}_${value.code}` };
              case 'routemapSelectedList':
                return (
                  !!value.length && {
                    routemap: value.map((val) => val.code).join(),
                  }
                );
              case 'citySelectedList':
                return (
                  !!value.length && {
                    cities: value.map((val) => val.roman).join(),
                  }
                );
              case 'townSelectedList':
                return (
                  !!value.length && {
                    towns: value.map((val) => val.code).join(),
                  }
                );
              case 'allTownSelected':
                return value && { allTowns: 1 };
              case 'industries':
                return {
                  // ind: getSelectedIndustries(value as []).join()
                };
              case 'hankagai':
                return {
                  hankagai: value?.areaRoma,
                };
              case 'googleMapState':
                return {
                  LAT: value.center.latitude,
                  LON: value.center.longitude,
                  CRN: value.crn || '',
                  maxLat: value.northeast?.latitude,
                  maxLon: value.northeast?.longitude,
                  minLat: value.southwest?.latitude,
                  minLon: value.southwest?.longitude,
                  zoom: value.zoom,
                  isFreeword: value?.isFreeword,
                };
              case 'mapSelected':
                return {
                  LAT: value.lat,
                  LON: value.lon,
                  CRN: value.roman || '',
                };
              case 'basicConditions':
              case 'insistenceConditions':
                return merge(
                  key === 'basicConditions' && { tsubo: 1 },
                  key === 'basicConditions' && { tanka: 1 }
                );
            }
          })
          .filter((a) => a)
          .reduce((prev, curr) => merge(prev, curr), {}),
      { q: 1 }
    );
  }

  private convertFromQueryParams<T>(
    params: Record<string, string>,
    base?: T
  ): T {
    return merge(
      cloneDeep(base),
      Object.entries(params)
        .filter(([, value]) => value)
        .map(([key, value]) => [key, value.replace(/['"\]].*$/, '')])
        .map(([key, value]) => {
          switch (key) {
            case 'sort':
              return { sort: value };
            case 'limit':
              return { number: value };
            case 'line':
              return (([roman, code]) => ({ lineSelected: { roman, code } }))(
                value.split('_')
              );
            case 'stations':
              return {
                stationSelectedList: value.split(',').map((line) =>
                  (([line, stations]) =>
                    (([roman, code]) => ({
                      roman,
                      code,
                      station: stations
                        .split('_')
                        .map((ekiCode) => ({ ekiCode })),
                    }))(line.split('_')))(line.split('-'))
                ),
              };
            case 'station':
              return {
                stationSelectedList: [
                  {
                    roman: '',
                    code: '',
                    station: value.split(',').map((roman) => ({ roman })),
                  },
                ],
              };
            case 'locate':
              return { locateSelected: { locateRomaji: value } };
            case 'routemap':
              return {
                routemapSelectedList: value
                  .split(',')
                  .map((code) => ({ code })),
              };
            case 'comOpt':
              return {
                commutingSelected: (([
                  adjacentPrefecture,
                  inputStationExclude,
                  retrieval,
                ]) => ({
                  adjacentPrefecture,
                  inputStationExclude,
                  retrieval,
                }))(value.split(',').map((val) => +val)),
              };
            case 'comFirst':
              return {
                commutingSelected: (([name, time, transferNum]) => ({
                  firstCommuting: {
                    station: { _name: name },
                    time: +time,
                    transferNum: +transferNum,
                  },
                }))(value.split(',')),
              };
            case 'comSecond':
              return {
                commutingSelected: (([name, time, transferNum]) => ({
                  secondCommuting: {
                    station: { _name: name },
                    time: +time,
                    transferNum: +transferNum,
                  },
                }))(value.split(',')),
              };
            case 'cities':
              return {
                citySelectedList: value.split(',').map((roman) => ({ roman })),
              };
            case 'towns':
              return {
                townSelectedList: value.split(',').map((code) => ({ code })),
              };
            case 'allTowns':
              return value && { allTownSelected: true };
            case 'ind':
              return {
                industries: value
                  .split(',')
                  .map((code) => ({ code, selected: 1 })),
              };
            case 'CRN':
              return {
                googleMapState: { crn: value },
                mapSelected: { roman: value },
              };
            case 'LAT':
              return {
                googleMapState: { center: { latitude: +value } },
                mapSelected: { lat: value },
              };
            case 'LON':
            case 'LNG':
              return {
                googleMapState: { center: { longitude: +value } },
                mapSelected: { lon: value },
              };
            case 'zoom':
              return { googleMapState: { zoom: +value } };
            case 'maxLat':
              return { googleMapState: { northeast: { latitude: +value } } };
            case 'maxLon':
              return { googleMapState: { northeast: { longitude: +value } } };
            case 'minLat':
              return { googleMapState: { southwest: { latitude: +value } } };
            case 'minLon':
              return { googleMapState: { southwest: { longitude: +value } } };
            case 'isFreeword':
              return { googleMapState: { isFreeword: +value } };
            case 'tsubo':
              return { basicConditions: { isUnitTubo: !!+value } };
            case 'tanka':
              return { basicConditions: { isTuboTanka: !!+value } };
            case 'basic':
            case 'kod':
              return {
                [key === 'basic' ? 'basicConditions' : 'insistenceConditions']:
                  {
                    group: [
                      {
                        conditions: [
                          {
                            condition: value
                              .split(',')
                              .map((val) => ({ selected: 1, value: val })),
                          },
                        ],
                      },
                    ],
                  },
              };
          }
        })
        .reduce((prev, curr) => merge(prev, curr), {})
    );
  }
}
