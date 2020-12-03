import { __decorate } from "tslib";
import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import * as events from 'devextreme/events';
import { ADMIN_MENU } from '@app/modules/admin/shared/constant';
var SideNavigationMenuComponent = /** @class */ (function () {
    function SideNavigationMenuComponent(elementRef) {
        this.elementRef = elementRef;
        this.selectedItemChanged = new EventEmitter();
        this.openMenu = new EventEmitter();
        this._compactMode = false;
        this.items = ADMIN_MENU;
    }
    Object.defineProperty(SideNavigationMenuComponent.prototype, "selectedItem", {
        set: function (value) {
            if (this.menu.instance) {
                this.menu.instance.selectItem(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SideNavigationMenuComponent.prototype, "compactMode", {
        get: function () {
            return this._compactMode;
        },
        set: function (val) {
            this._compactMode = val;
            if (val && this.menu.instance) {
                this.menu.instance.collapseAll();
            }
        },
        enumerable: false,
        configurable: true
    });
    SideNavigationMenuComponent.prototype.ngOnInit = function () {
    };
    SideNavigationMenuComponent.prototype.updateSelection = function (event) {
        var nodeClass = 'dx-treeview-node';
        var selectedClass = 'dx-state-selected';
        var leafNodeClass = 'dx-treeview-node-is-leaf';
        var element = event.element;
        var rootNodes = element.querySelectorAll("." + nodeClass + ":not(." + leafNodeClass + ")");
        Array.from(rootNodes).forEach(function (node) {
            node.classList.remove(selectedClass);
        });
        var selectedNode = element.querySelector("." + nodeClass + "." + selectedClass);
        while (selectedNode && selectedNode.parentElement) {
            if (selectedNode.classList.contains(nodeClass)) {
                selectedNode.classList.add(selectedClass);
            }
            selectedNode = selectedNode.parentElement;
        }
    };
    SideNavigationMenuComponent.prototype.onItemClick = function (event) {
        this.selectedItemChanged.emit(event);
    };
    SideNavigationMenuComponent.prototype.onMenuInitialized = function (event) {
        event.component.option('deferRendering', false);
    };
    SideNavigationMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        events.on(this.elementRef.nativeElement, 'dxclick', function (e) {
            _this.openMenu.next(e);
        });
    };
    SideNavigationMenuComponent.prototype.ngOnDestroy = function () {
        events.off(this.elementRef.nativeElement, 'dxclick');
    };
    __decorate([
        ViewChild(DxTreeViewComponent, { static: true })
    ], SideNavigationMenuComponent.prototype, "menu", void 0);
    __decorate([
        Output()
    ], SideNavigationMenuComponent.prototype, "selectedItemChanged", void 0);
    __decorate([
        Output()
    ], SideNavigationMenuComponent.prototype, "openMenu", void 0);
    __decorate([
        Input()
    ], SideNavigationMenuComponent.prototype, "selectedItem", null);
    __decorate([
        Input()
    ], SideNavigationMenuComponent.prototype, "compactMode", null);
    SideNavigationMenuComponent = __decorate([
        Component({
            selector: 'app-side-navigation-menu',
            templateUrl: './side-navigation-menu.component.html',
            styleUrls: ['./side-navigation-menu.component.scss']
        })
    ], SideNavigationMenuComponent);
    return SideNavigationMenuComponent;
}());
export { SideNavigationMenuComponent };
//# sourceMappingURL=side-navigation-menu.component.js.map