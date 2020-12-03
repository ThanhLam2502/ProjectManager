import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, ReplaySubject, of} from 'rxjs';
import {NgxPermissionsService} from 'ngx-permissions';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@environment';
import {randomLoggedUser} from '@app/data/auth';
import {
  ACCESS_TOKEN_KEY, IMAGE_TOKEN_KEY, REFRESH_TOKEN_KEY,
  HOME_URL_KEY, REMEMBER_ME_KEY
} from '@app/shared/constants';
import {API_ENDPOINT} from '@app/shared/endpoints';
import {AccessTokenResponse, UserModel} from '@app/modules/core/models';
import {AppStorage, ImageUtility} from '@app/utilities';
import {ApiService} from '@app/modules/core/services/api.service';

@Injectable()
export class AuthenticationService {
  private isRefreshingToken = false;

  constructor(private router: Router,
              private jwtHelper: JwtHelperService,
              private permissionsService: NgxPermissionsService,
              private apiService: ApiService) {
  }

  removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(IMAGE_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(HOME_URL_KEY);
  }

  isLoggedIn(): boolean {
    if (!this.apiService.accessToken) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(this.apiService.accessToken)) {
      return false;
    }
    // Will be refresh token
    return true;
  }

  setCurrentUser(user: UserModel) {
    //
    ImageUtility.setAvatar(user);
    //
    AppStorage.storeTokenData(ACCESS_TOKEN_KEY, user.accessToken);
    AppStorage.storeTokenData(REFRESH_TOKEN_KEY, user.refreshToken);
    //
    this.permissionsService.loadPermissions(user.permissions || []);
  }

  redirectToHome(homeUrl?: string) {
    if (!homeUrl) {
      homeUrl = AppStorage.getTokenData(HOME_URL_KEY);
    }
    if (homeUrl) {
      this.router.navigateByUrl(homeUrl);
    } else {
      // TODO: Handle other cases
      console.error('None homeUrl');
      this.router.navigate(['/']);
    }
  }

  removeCurrentUser(navigateToLogin = true) {
    //
    //
    this.permissionsService.flushPermissions();
    //
    this.removeTokens();
    //
    if (navigateToLogin) {
      this.apiService.navigateToLogin();
    }
  }



  // TODO: Move to logged-user service
  logout() {
    this.apiService.get(`${API_ENDPOINT.Auth}/logout`).toPromise().then();
    //
    this.removeCurrentUser(true);
  }

  refreshAccessToken(): Observable<AccessTokenResponse> {
    const refreshToken = AppStorage.getTokenData(REFRESH_TOKEN_KEY);
    const refreshObservable = this.apiService.get(`${API_ENDPOINT.Auth}/refresh/${refreshToken}`);
    const refreshSubject = new ReplaySubject<AccessTokenResponse>(1);
    if (!this.isRefreshingToken) {
      //
      refreshSubject.subscribe((tokens: AccessTokenResponse) => {
        AppStorage.storeTokenData(REFRESH_TOKEN_KEY, tokens.refreshToken);
        AppStorage.storeTokenData(ACCESS_TOKEN_KEY, tokens.accessToken);
        this.isRefreshingToken = false;
      }, (error) => {
        this.isRefreshingToken = false;
      });
      refreshObservable.subscribe(refreshSubject);
      this.isRefreshingToken = true;
      //
      return refreshSubject;
    }
  }
}
