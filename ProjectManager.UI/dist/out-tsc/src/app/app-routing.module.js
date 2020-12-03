import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from '@app/theme';
import { AuthGuard } from '@app/modules/auth/services';
var routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    {
        path: 'admin',
        loadChildren: function () { return import('@app/modules/admin/admin.module').then(function (m) { return m.AdminModule; }); },
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: function () { return import('@app/modules/auth/auth.module').then(function (m) { return m.AuthModule; }); },
    },
    { path: '**', component: ErrorComponent }
];
var config = {
    useHash: false
};
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, config)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map