import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxPermissionsService} from 'ngx-permissions';
import {forkJoin, of} from 'rxjs';

import {AppNotify} from '@app/utilities';
import {ApiService} from './api.service';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AppLoadService {
  protected httpClient: HttpClient;
  protected permissionsService: NgxPermissionsService;
  protected apiService: ApiService;
  protected authService: AuthenticationService;

  constructor(private injector: Injector) {
    this.httpClient = this.injector.get(HttpClient);
    this.permissionsService = this.injector.get(NgxPermissionsService);
    this.apiService = this.injector.get(ApiService);
    this.authService = this.injector.get(AuthenticationService);
  }

  initApp(): Promise<any> {
    //
    // TODO: Init webWorker here

    //
    if (this.authService.isLoggedIn()) {
      // forkJoin to require all requests to complete
      const result = forkJoin({
        // lookup: this.loadAppLookup()

      }).toPromise().then((response) => {
        // Handle here if needed
      }, (error) => {
        AppNotify.error();
        this.authService.logout();
      });
      return result;
    } else {
      return of(true).toPromise();
    }
  }


}
