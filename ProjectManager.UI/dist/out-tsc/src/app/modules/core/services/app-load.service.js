import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { forkJoin, of } from 'rxjs';
import { AppNotify } from '@app/utilities';
import { AuthenticationService } from '@app/modules/auth/services';
import { ApiService } from './api.service';
var AppLoadService = /** @class */ (function () {
    function AppLoadService(injector) {
        this.injector = injector;
        this.httpClient = this.injector.get(HttpClient);
        this.permissionsService = this.injector.get(NgxPermissionsService);
        this.apiService = this.injector.get(ApiService);
        this.authService = this.injector.get(AuthenticationService);
    }
    AppLoadService.prototype.initApp = function () {
        //
        // TODO: Init webWorker here
        var _this = this;
        //
        if (this.authService.isLoggedIn()) {
            // forkJoin to require all requests to complete
            var result = forkJoin({
                // lookup: this.loadAppLookup()
                user: this.loadUser()
            }).toPromise().then(function (response) {
                // Handle here if needed
            }, function (error) {
                AppNotify.error();
                _this.authService.logout();
            });
            return result;
        }
        else {
            return of(true).toPromise();
        }
    };
    AppLoadService.prototype.loadUser = function () {
        var _this = this;
        return this.authService.getCurrentUserInfo().toPromise().then(function (user) {
            _this.authService.setCurrentUser(user);
            //
            return user;
        });
    };
    AppLoadService = __decorate([
        Injectable()
    ], AppLoadService);
    return AppLoadService;
}());
export { AppLoadService };
//# sourceMappingURL=app-load.service.js.map