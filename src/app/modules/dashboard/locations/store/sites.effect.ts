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
import { SitesService } from 'src/app/core/services/sites.service';
import { UserService } from 'src/app/core/services/user.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateSiteModel,
  RequestCreateSiteModel,
  RequestDeactivateSiteModel,
  RequestDeleteSiteDocumentModel,
  RequestGetSiteByIdModel,
  RequestGetSiteDocumentWithContentModel,
  RequestGetSiteListModel,
  RequestUpdateSiteModel,
  ResponseGetSiteListModel,
  ResponseGetSiteModel,
} from '../models';
import * as sitesActions from './sites.actions';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';

@Injectable()
export class SitesEffects {
  constructor(
    private actions$: Actions,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private readonly siteService: SitesService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sitesActions.siteCreateAction),
      switchMap(
        (action: {
          payload: RequestCreateSiteModel;
          searchParams: RequestGetSiteListModel;
        }) => {
          return this.siteService.create(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SITE_CREATED
              );

              this.modalService.closeAll();

              return sitesActions.siteCreateSuccessAction({
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
      ofType(sitesActions.siteGetByIdAction),
      switchMap((action: { payload: RequestGetSiteByIdModel }) => {
        return this.siteService.getById(action.payload).pipe(
          map((data: ResponseGetSiteModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return sitesActions.siteGetByIdSuccessAction({ payload: data });
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

  searchSites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sitesActions.sitesSearchAction),
      switchMap((action: { payload: RequestGetSiteListModel }) => {
        return this.siteService.getAll(action.payload).pipe(
          map((data: ResponseGetSiteListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return sitesActions.sitesSearchSuccessAction({ payload: data });
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
      ofType(sitesActions.siteUpdateAction),
      switchMap(
        (action: {
          payload: RequestUpdateSiteModel;
          searchParams: RequestGetSiteListModel;
        }) => {
          return this.siteService.update(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SITE_UPDATED
              );

              this.modalService.closeAll();

              return sitesActions.siteUpdateSuccessAction({
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
      ofType(sitesActions.siteDeactivateAction),
      switchMap(
        (action: {
          payload: RequestDeactivateSiteModel;
          searchParams: RequestGetSiteListModel;
        }) => {
          return this.siteService.deactivate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SITE_DEACTIVATED
              );

              this.modalService.closeAll();

              return sitesActions.siteDeactivateSuccessAction({
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
      ofType(sitesActions.siteActivateAction),
      switchMap(
        (action: {
          payload: RequestActivateSiteModel;
          searchParams: RequestGetSiteListModel;
        }) => {
          return this.siteService.activate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SITE_REACTIVATED
              );

              return sitesActions.siteActivateSuccessAction({
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
        sitesActions.siteUpdateSuccessAction,
        sitesActions.siteActivateSuccessAction,
        sitesActions.siteCreateSuccessAction,
        sitesActions.siteDeactivateSuccessAction
      ),
      mergeMap((action) => {
        return of(
          sitesActions.sitesSearchAction({
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

  deleteDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sitesActions.siteDocumentDeleteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeleteSiteDocumentModel;
            siteId: string;
          };
        }) => {
          return this.siteService.deleteDocument(action.payload.data).pipe(
            switchMap((data: BaseResponseModel) => {
              if (!data.success) {
                return of(
                  errorActions.errorAction({
                    payload: {
                      error: data.message,
                      isApiError: true,
                    },
                  })
                );
              }
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_DOCUMENT_DELETE
              );

              return of(
                sitesActions.siteDocumentDeleteSuccessAction({
                  payload: {
                    data,
                  },
                }),
                sitesActions.siteGetByIdAction({ payload: { id: action.payload.siteId } })
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
        }
      )
    );
  });

  downloadSiteDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sitesActions.downloadSiteDocumentAction),
      switchMap(
        (action: {
          payload: RequestGetSiteDocumentWithContentModel & { fileName: string };
        }) => {
          return this.siteService.getByIdWithContent(action.payload).pipe(
            switchMap((data: Blob) => {
              // if (!data.success) {
              //   return of(
              //     errorActions.errorAction({
              //       payload: {
              //         error: data.message,
              //         isApiError: true,
              //       },
              //     })
              //   );
              // }

              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.fileName
              );

              return of(sitesActions.downloadSiteDocumentActionSuccess());
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
}
