import { __decorate, __read, __spread } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//
import { ThemeModule } from '@app/theme';
import { GuestGuard } from '@app/modules/auth/services';
import { AuthComponent } from '@app/modules/auth/components/auth.component';
import { LoginFormComponent } from '@app/modules/auth/components/login-form/login-form.component';
var COMPONENTS = [
    AuthComponent, LoginFormComponent
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        NgModule({
            imports: [
                ThemeModule,
                RouterModule.forChild([
                    {
                        path: 'login',
                        component: LoginFormComponent,
                        canActivate: [GuestGuard]
                    }
                ])
            ],
            declarations: __spread(COMPONENTS)
        })
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=auth.module.js.map