import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ADMIN_MENU } from '@app/modules/admin/shared/constant';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        var _this = this;
        this.menuToggleEnabled = false;
        this.showHeaderMenu = false;
        this.menuToggle = new EventEmitter();
        this.menuItems = ADMIN_MENU;
        this.toggleMenu = function () {
            _this.menuToggle.emit();
        };
    }
    HeaderComponent.prototype.onSubmenuShowing = function (e) {
        if (e) {
            var menuPopup = e.submenu.$contentDelimiter[0].parentNode;
            if (menuPopup) {
                menuPopup.classList.add('header-submenu');
            }
        }
    };
    __decorate([
        Input()
    ], HeaderComponent.prototype, "menuToggleEnabled", void 0);
    __decorate([
        Input()
    ], HeaderComponent.prototype, "showHeaderMenu", void 0);
    __decorate([
        Output()
    ], HeaderComponent.prototype, "menuToggle", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: 'header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map