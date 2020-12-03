import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ReplaySubject, of } from 'rxjs';
import { environment } from '@environment';
import { randomLoggedUser } from '@app/data/auth';
import { ACCESS_TOKEN_KEY, IMAGE_TOKEN_KEY, REFRESH_TOKEN_KEY, HOME_URL_KEY } from '@app/shared/constants';
import { API_ENDPOINT } from '@app/shared/endpoints';
import { AppStorage, ImageUtility } from '@app/utilities';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(router, jwtHelper, permissionsService, apiService, loggedUserService) {
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.permissionsService = permissionsService;
        this.apiService = apiService;
        this.loggedUserService = loggedUserService;
        this.isRefreshingToken = false;
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUser", {
        get: function () {
            return this.loggedUserService.currentUser;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "loggedUser", {
        get: function () {
            return this.loggedUserService.loggedUser;
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationService.prototype.removeTokens = function () {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(IMAGE_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(HOME_URL_KEY);
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        if (!this.apiService.accessToken) {
            return false;
        }
        if (this.jwtHelper.isTokenExpired(this.apiService.accessToken)) {
            return false;
        }
        // Will be refresh token
        return true;
    };
    AuthenticationService.prototype.setCurrentUser = function (user) {
        //
        ImageUtility.setAvatar(user);
        this.loggedUserService.setLoggedUser(user);
        //
        AppStorage.storeTokenData(ACCESS_TOKEN_KEY, user.accessToken);
        AppStorage.storeTokenData(REFRESH_TOKEN_KEY, user.refreshToken);
        //
        this.permissionsService.loadPermissions(user.permissions || []);
    };
    AuthenticationService.prototype.redirectToHome = function (homeUrl) {
        if (!homeUrl) {
            homeUrl = AppStorage.getTokenData(HOME_URL_KEY);
        }
        if (homeUrl) {
            this.router.navigateByUrl(homeUrl);
        }
        else {
            // TODO: Handle other cases
            console.error('None homeUrl');
            this.router.navigate(['/']);
        }
    };
    AuthenticationService.prototype.removeCurrentUser = function (navigateToLogin) {
        if (navigateToLogin === void 0) { navigateToLogin = true; }
        //
        this.loggedUserService.setLoggedUser(null);
        //
        this.permissionsService.flushPermissions();
        //
        this.removeTokens();
        //
        if (navigateToLogin) {
            this.apiService.navigateToLogin();
        }
    };
    AuthenticationService.prototype.getCurrentUserInfo = function () {
        if (!environment.production) {
            console.log('API: getCurrentUserInfo');
            return of(randomLoggedUser());
        }
    };
    AuthenticationService.prototype.login = function (param) {
        if (!environment.production) {
            return of(randomLoggedUser());
        }
    };
    // TODO: Move to logged-user service
    AuthenticationService.prototype.logout = function () {
        this.apiService.get(API_ENDPOINT.Auth + "/logout").toPromise().then();
        //
        this.removeCurrentUser(true);
    };
    AuthenticationService.prototype.refreshAccessToken = function () {
        var _this = this;
        var refreshToken = AppStorage.getTokenData(REFRESH_TOKEN_KEY);
        var refreshObservable = this.apiService.get(API_ENDPOINT.Auth + "/refresh/" + refreshToken);
        var refreshSubject = new ReplaySubject(1);
        if (!this.isRefreshingToken) {
            //
            refreshSubject.subscribe(function (tokens) {
                AppStorage.storeTokenData(REFRESH_TOKEN_KEY, tokens.refreshToken);
                AppStorage.storeTokenData(ACCESS_TOKEN_KEY, tokens.accessToken);
                _this.isRefreshingToken = false;
            }, function (error) {
                _this.isRefreshingToken = false;
            });
            refreshObservable.subscribe(refreshSubject);
            this.isRefreshingToken = true;
            //
            return refreshSubject;
        }
    };
    AuthenticationService = __decorate([
        Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map