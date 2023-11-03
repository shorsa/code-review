import { environment } from 'src/environments/environment';

export class ApiEndpointHelper {
  static get(methodName: string): string {
    return `${environment.apiUrl}${methodName}`;
  }

  static getHub(path: string): string {
    return `${environment.hubUrl}${path}`;
  }
}
