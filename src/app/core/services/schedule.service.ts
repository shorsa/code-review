import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateNonWorkingDayModel,
  RequestDeleteNonWorkingDayModel,
  RequestGetNonWorkingDaysListModel,
  ResponseGetNonWorkingDaysListModel,
} from 'src/app/modules/dashboard/schedule/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private httpClient: HttpClient) {}

  addDate(model: RequestCreateNonWorkingDayModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SCHEDULE_ADD_DATE),
      model
    );
  }

  deleteDate(model: RequestDeleteNonWorkingDayModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SCHEDULE_DELETE_DATE),
      model
    );
  }

  getSchedule(
    model: RequestGetNonWorkingDaysListModel
  ): Observable<ResponseGetNonWorkingDaysListModel> {
    return this.httpClient.post<ResponseGetNonWorkingDaysListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SCHEDULE_GET_ALL),
      model
    );
  }
}
