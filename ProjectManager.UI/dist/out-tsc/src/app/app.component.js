import { __decorate } from "tslib";
import { Component, HostBinding } from '@angular/core';
var AppComponent = /** @class */ (function () {
    function AppComponent(screen) {
        this.screen = screen;
    }
    Object.defineProperty(AppComponent.prototype, "getClass", {
        get: function () {
            var _this = this;
            return Object.keys(this.screen.sizes).filter(function (cl) { return _this.screen.sizes[cl]; }).join(' ');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        HostBinding('class')
    ], AppComponent.prototype, "getClass", null);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            template: '<router-outlet></router-outlet>',
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map