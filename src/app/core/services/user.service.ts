import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  unlock(model: { id: string }): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.USER_UNLOCK),
      model
    );
  }
}
