import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authService, apiService) {
        this.router = router;
        this.authService = authService;
        this.apiService = apiService;
    }
    AuthGuard.prototype.isLoggedIn = function () {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        //
        this.authService.removeCurrentUser(false);
        this.apiService.navigateToLogin(true);
        //
        return false;
    };
    AuthGuard.prototype.canActivate = function (route, state) {
        return this.isLoggedIn();
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.isLoggedIn();
    };
    AuthGuard.prototype.canLoad = function (route) {
        return this.isLoggedIn();
    };
    AuthGuard = __decorate([
        Injectable()
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map