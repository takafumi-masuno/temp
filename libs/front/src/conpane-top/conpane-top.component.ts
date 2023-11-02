import { Component, OnInit } from '@angular/core';
import { ConpaneTopStore } from './conpane-top.store';
import { StoreAppFacade } from '../shared/stores/app';
import { map } from 'rxjs';

@Component({
  selector: 'conpane-top',
  templateUrl: './conpane-top.component.html',
  styleUrls: ['./conpane-top.component.scss'],
  providers: [ConpaneTopStore],
})
export class ConpaneTopComponent implements OnInit {
  constructor(
    public conpaneTopStore: ConpaneTopStore,
    public storeAppFacade: StoreAppFacade
  ) {}

  readonly user$ = this.storeAppFacade.user$;

  readonly shougou$ = this.storeAppFacade.user$.pipe(
    map((value) => value?.info.shougou)
  );

  readonly atPermissions$ = this.storeAppFacade.user$.pipe(
    map((value) => value?.permissions.atUser)
  );

  // 初期処理
  ngOnInit(): void {
    console.log();
  }

  post() {
    console.log();
  }
}
