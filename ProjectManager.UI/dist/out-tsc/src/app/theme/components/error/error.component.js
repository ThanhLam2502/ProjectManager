import { __decorate } from "tslib";
import { Component } from '@angular/core';
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorComponent.prototype.ngOnInit = function () {
    };
    ErrorComponent.prototype.logout = function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.authenticationService.logout();
    };
    ErrorComponent = __decorate([
        Component({
            selector: 'app-error',
            templateUrl: './error.component.html',
            styleUrls: ['./error.component.css']
        })
    ], ErrorComponent);
    return ErrorComponent;
}());
export { ErrorComponent };
//# sourceMappingURL=error.component.js.map