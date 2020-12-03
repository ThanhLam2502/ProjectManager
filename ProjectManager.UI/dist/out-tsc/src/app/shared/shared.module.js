import { __decorate, __read, __spread } from "tslib";
import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme';
import { AuthenticationService, AuthGuard, GuestGuard, LoggedUserService } from '@app/modules/auth/services';
import { ApiService, AppLoadService, DeviceDetectorService, ScreenService } from '@app/modules/core/services';
import { PopoverConfirmBoxComponent } from '@app/shared/components/popover-confirm-box/popover-confirm-box.component';
import { PopoverTitleComponent } from '@app/shared/components/popover-title/popover-title.component';
var PROVIDERS = [
    //
    AuthGuard,
    GuestGuard,
    //
    ApiService,
    ScreenService,
    AppLoadService,
    AuthenticationService,
    LoggedUserService,
    DeviceDetectorService
];
var COMPONENTS = [PopoverConfirmBoxComponent,
    PopoverTitleComponent];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: __spread(PROVIDERS),
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        NgModule({
            imports: [
                ThemeModule
            ],
            declarations: __spread(COMPONENTS),
            exports: __spread(COMPONENTS)
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map