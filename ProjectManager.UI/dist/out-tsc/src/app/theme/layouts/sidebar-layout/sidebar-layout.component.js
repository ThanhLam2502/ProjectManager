import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
var SidebarLayoutComponent = /** @class */ (function () {
    function SidebarLayoutComponent(screen, router) {
        this.screen = screen;
        this.router = router;
        this.selectedRoute = '';
        this.temporaryMenuOpened = false;
        this.menuMode = 'shrink';
        this.menuRevealMode = 'expand';
        this.minMenuSize = 0;
        this.shaderEnabled = false;
        this.subscription = new Subscription();
    }
    SidebarLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuOpened = this.screen.sizes['screen-large'];
        this.subscription.add(this.router.events.subscribe(function (val) {
            if (val instanceof NavigationEnd) {
                _this.selectedRoute = val.urlAfterRedirects.split('?')[0];
            }
        }));
        this.subscription.add(this.screen.changed.subscribe(function () { return _this.updateDrawer(); }));
        this.updateDrawer();
    };
    SidebarLayoutComponent.prototype.updateDrawer = function () {
        var isXSmall = this.screen.sizes['screen-x-small'];
        var isLarge = this.screen.sizes['screen-large'];
        this.menuMode = isLarge ? 'shrink' : 'overlap';
        this.menuRevealMode = isXSmall ? 'slide' : 'expand';
        this.minMenuSize = isXSmall ? 0 : 60;
        this.shaderEnabled = !isLarge;
    };
    Object.defineProperty(SidebarLayoutComponent.prototype, "hideMenuAfterNavigation", {
        get: function () {
            return this.menuMode === 'overlap' || this.temporaryMenuOpened;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SidebarLayoutComponent.prototype, "showMenuAfterClick", {
        get: function () {
            return !this.menuOpened;
        },
        enumerable: false,
        configurable: true
    });
    SidebarLayoutComponent.prototype.navigationChanged = function (event) {
        var link = event.itemData.link;
        var pointerEvent = event.event;
        if (link && this.menuOpened) {
            if (event.node.selected) {
                pointerEvent.preventDefault();
            }
            else {
                this.router.navigate([link]);
            }
            if (this.hideMenuAfterNavigation) {
                this.temporaryMenuOpened = false;
                this.menuOpened = false;
                pointerEvent.stopPropagation();
            }
        }
        else {
            pointerEvent.preventDefault();
        }
    };
    SidebarLayoutComponent.prototype.navigationClick = function () {
        if (this.showMenuAfterClick) {
            this.temporaryMenuOpened = true;
            this.menuOpened = true;
        }
    };
    SidebarLayoutComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SidebarLayoutComponent = __decorate([
        Component({
            selector: 'app-layout-sidebar',
            templateUrl: './sidebar-layout.component.html',
            styleUrls: ['./sidebar-layout.component.scss']
        })
    ], SidebarLayoutComponent);
    return SidebarLayoutComponent;
}());
export { SidebarLayoutComponent };
//# sourceMappingURL=sidebar-layout.component.js.map