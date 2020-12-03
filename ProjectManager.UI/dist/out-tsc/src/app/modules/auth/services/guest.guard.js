import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var GuestGuard = /** @class */ (function () {
    function GuestGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    GuestGuard.prototype.canActivate = function () {
        if (!this.authService.isLoggedIn()) {
            return true;
        }
        else {
            this.authService.redirectToHome();
            return false;
        }
    };
    GuestGuard = __decorate([
        Injectable()
    ], GuestGuard);
    return GuestGuard;
}());
export { GuestGuard };
//# sourceMappingURL=guest.guard.js.map