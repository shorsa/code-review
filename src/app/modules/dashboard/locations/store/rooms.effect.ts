import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { UserService } from 'src/app/core/services/user.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateRoomModel,
  RequestCreateRoomModel,
  RequestDeactivateRoomModel,
  RequestGetRoomByIdModel,
  RequestGetRoomListModel,
  RequestUpdateRoomModel,
  ResponseGetRoomListModel,
  ResponseGetRoomModel,
} from '../models';
import * as roomsActions from './rooms.actions';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Injectable()
export class RoomsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly roomsService: RoomsService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(roomsActions.roomCreateAction),
      switchMap(
        (action: {
          payload: RequestCreateRoomModel;
          searchParams: RequestGetRoomListModel;
        }) => {
          return this.roomsService.create(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_ROOM_CREATED
              );

              this.modalService.closeAll();

              return roomsActions.roomCreateSuccessAction({
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
      ofType(roomsActions.roomGetByIdAction),
      switchMap((action: { payload: RequestGetRoomByIdModel }) => {
        return this.roomsService.getById(action.payload).pipe(
          map((data: ResponseGetRoomModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return roomsActions.roomGetByIdSuccessAction({ payload: data });
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

  searchRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(roomsActions.roomsSearchAction),
      switchMap((action: { payload: RequestGetRoomListModel }) => {
        return this.roomsService.getAll(action.payload).pipe(
          map((data: ResponseGetRoomListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return roomsActions.roomsSearchSuccessAction({ payload: data });
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
      ofType(roomsActions.roomUpdateAction),
      switchMap(
        (action: {
          payload: RequestUpdateRoomModel;
          searchParams: RequestGetRoomListModel;
        }) => {
          return this.roomsService.update(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_ROOM_UPDATED
              );

              this.modalService.closeAll();

              return roomsActions.roomUpdateSuccessAction({
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
      ofType(roomsActions.roomDeactivateAction),
      switchMap(
        (action: {
          payload: RequestDeactivateRoomModel;
          searchParams: RequestGetRoomListModel;
        }) => {
          return this.roomsService.deactivate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_ROOM_DEACTIVATED
              );

              this.modalService.closeAll();

              return roomsActions.roomDeactivateSuccessAction({
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
      ofType(roomsActions.roomActivateAction),
      switchMap(
        (action: {
          payload: RequestActivateRoomModel;
          searchParams: RequestGetRoomListModel;
        }) => {
          return this.roomsService.activate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_ROOM_REACTIVATED
              );

              return roomsActions.roomActivateSuccessAction({
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
        roomsActions.roomUpdateSuccessAction,
        roomsActions.roomActivateSuccessAction,
        roomsActions.roomCreateSuccessAction,
        roomsActions.roomDeactivateSuccessAction
      ),
      mergeMap((action) => {
        // if (!searchParams) return of();

        return of(
          roomsActions.roomsSearchAction({
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
