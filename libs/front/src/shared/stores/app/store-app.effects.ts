import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as actions from './store-app.actions';
import { SessionService, UserService } from '../../services';

@Injectable()
export class StoreAppEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private sessionService: SessionService
  ) {}
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getUser),
      mergeMap(({ sessionId }) => {
        return this.userService
          .getInfo(sessionId)
          .pipe(map((user) => actions.gotUser(user)));
      })
    )
  );

  getIsSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getIsSession),
      mergeMap(({ sessionId }) => {
        return this.sessionService.getIsSession(sessionId).pipe(
          map((session) =>
            actions.setSession({
              isSession: session.code === 200 ? true : false,
            })
          )
        );
      })
    )
  );
}
