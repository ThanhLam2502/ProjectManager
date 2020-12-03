import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var LoggedUserService = /** @class */ (function () {
    function LoggedUserService() {
        this._currentUser = new BehaviorSubject(null);
    }
    Object.defineProperty(LoggedUserService.prototype, "currentUser", {
        get: function () {
            return this._currentUser.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    LoggedUserService.prototype.setLoggedUser = function (user) {
        this._currentUser.next(user);
    };
    Object.defineProperty(LoggedUserService.prototype, "loggedUserId", {
        get: function () {
            var user = this._currentUser.getValue();
            return user ? user.id : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggedUserService.prototype, "loggedUser", {
        get: function () {
            return this._currentUser.getValue();
        },
        enumerable: false,
        configurable: true
    });
    LoggedUserService = __decorate([
        Injectable()
    ], LoggedUserService);
    return LoggedUserService;
}());
export { LoggedUserService };
//# sourceMappingURL=logged-user.service.js.map