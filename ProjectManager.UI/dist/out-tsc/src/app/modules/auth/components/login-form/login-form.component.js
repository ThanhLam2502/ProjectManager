import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VALIDATION_REGEX } from '@app/shared/constants';
import { LoginModel } from '@app/modules/auth/models';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(authService) {
        this.authService = authService;
        this.userName = '';
        this.password = '';
        this.isSubmitting = false;
        this.userNameValidator = function (params) {
            var value = params.value;
            if (VALIDATION_REGEX.email.test(value)) {
                return true;
            }
            if (VALIDATION_REGEX.phone.test(value)) {
                return true;
            }
            return false;
        };
    }
    LoginFormComponent.prototype.onLoginClick = function (args) {
        var _this = this;
        // if (!args.validationGroup.validate().isValid) {
        if (args.validationGroup.validate().isValid) {
            return;
        }
        var param = new LoginModel({ username: this.userName, password: this.password });
        this.isSubmitting = true;
        this.authService.login(param).subscribe(function (data) {
            _this.isSubmitting = false;
            //
            _this.authService.setCurrentUser(data);
            //
            _this.authService.redirectToHome('/');
        }, function () {
            _this.isSubmitting = false;
        });
    };
    LoginFormComponent = __decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.scss']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map