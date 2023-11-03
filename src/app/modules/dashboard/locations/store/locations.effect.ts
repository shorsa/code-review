import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { LocationService } from 'src/app/core/services/location.service';
import { UserService } from 'src/app/core/services/user.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateLocationModel,
  RequestCreateLocationModel,
  RequestDeactivateLocationModel,
  RequestGetLocationByIdModel,
  RequestGetLocationListModel,
  RequestUpdateLocationModel,
  ResponseGetLocationListModel,
  ResponseGetLocationModel,
} from '../models';
import * as locationActions from '../store/locations.actions';
import { IsActiveFilterEnum } from 'src/app/shared/enums';

@Injectable()
export class LocationEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly locationService: LocationService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationCreateAction),
      switchMap(
        (action: {
          payload: RequestCreateLocationModel;
          searchParams: RequestGetLocationListModel;
        }) => {
          return this.locationService.create(action.payload).pipe(
            map((data: BaseResponseModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_LOCATION_CREATED
              );

              this.modalService.closeAll();

              return locationActions.locationCreateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
              });
            }),

            catchError((error) => {
              return of(
                errorActions.errorAction({
                  payload: {
                    error: JSON.stringify(error),
                    isApiError: true,
                  },
                })
              );
            })
          );
        }
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationGetByIdAction),
      switchMap((action: { payload: RequestGetLocationByIdModel }) => {
        return this.locationService.getById(action.payload).pipe(
          map((data: ResponseGetLocationModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return locationActions.locationGetByIdSuccessAction({ payload: data });
          }),

          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  searchLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationsSearchAction),
      switchMap((action: { payload: RequestGetLocationListModel }) => {
        return this.locationService.getAll(action.payload).pipe(
          map((data: ResponseGetLocationListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return locationActions.locationsSearchSuccessAction({ payload: data });
          }),

          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationUpdateAction),
      switchMap(
        (action: {
          payload: RequestUpdateLocationModel;
          searchParams: RequestGetLocationListModel;
        }) => {
          return this.locationService.update(action.payload).pipe(
            map((data: BaseResponseModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }

              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_LOCATION_UPDATED
              );

              this.modalService.closeAll();

              return locationActions.locationUpdateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
              });
            }),

            catchError((error) => {
              return of(
                errorActions.errorAction({
                  payload: {
                    error: JSON.stringify(error),
                    isApiError: true,
                  },
                })
              );
            })
          );
        }
      )
    );
  });

  deactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationDeactivateAction),
      switchMap(
        (action: {
          payload: RequestDeactivateLocationModel;
          searchParams: RequestGetLocationListModel;
        }) => {
          return this.locationService.deactivate(action.payload).pipe(
            map((data: BaseResponseModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }

              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_LOCATION_DEACTIVATED
              );

              this.modalService.closeAll();

              return locationActions.locationDeactivateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
              });
            }),

            catchError((error) => {
              return of(
                errorActions.errorAction({
                  payload: {
                    error: JSON.stringify(error),
                    isApiError: true,
                  },
                })
              );
            })
          );
        }
      )
    );
  });

  reactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.locationActivateAction),
      switchMap(
        (action: {
          payload: RequestActivateLocationModel;
          searchParams: RequestGetLocationListModel;
        }) => {
          return this.locationService.activate(action.payload).pipe(
            map((data: BaseResponseModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }

              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_LOCATION_REACTIVATED
              );

              return locationActions.locationActivateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
              });
            }),

            catchError((error) => {
              return of(
                errorActions.errorAction({
                  payload: {
                    error: JSON.stringify(error),
                    isApiError: true,
                  },
                })
              );
            })
          );
        }
      )
    );
  });

  searchAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        locationActions.locationUpdateSuccessAction,
        locationActions.locationActivateSuccessAction,
        locationActions.locationCreateSuccessAction,
        locationActions.locationDeactivateSuccessAction
      ),
      mergeMap((action) => {
        // if (!searchParams) return of();

        return of(
          locationActions.locationsSearchAction({
            payload: action.searchParams,
          })
        );
      }),

      catchError((error) => {
        return of(
          errorActions.errorAction({
            payload: {
              error: JSON.stringify(error),
              isApiError: true,
            },
          })
        );
      })
    );
  });
}
