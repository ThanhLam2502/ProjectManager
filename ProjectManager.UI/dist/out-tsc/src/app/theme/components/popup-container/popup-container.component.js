import { __decorate } from "tslib";
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
var PopupContainerComponent = /** @class */ (function () {
    function PopupContainerComponent(deviceService) {
        this.deviceService = deviceService;
        this._visible = false;
        this._width = 'auto';
        this._height = 'auto';
        this.fullScreenOnMobile = true;
        this.fullScreenOnTablet = false;
        this.fullScreen = false;
        this.autoFullScreenOnOverflow = true;
        this.showCloseButton = true;
        this.shading = true;
        this.dragEnabled = false;
        this.visibleChange = new EventEmitter();
        this.widthChange = new EventEmitter();
        this.heightChange = new EventEmitter();
        this.titleChange = new EventEmitter();
        this.onHiding = new EventEmitter();
        this.isFullScreenPopup = false;
        this.autoContentContainerHeight = true;
        this.isRendering = true;
    }
    Object.defineProperty(PopupContainerComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.visibleChange.emit(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PopupContainerComponent.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this.widthChange.emit(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PopupContainerComponent.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this.heightChange.emit(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PopupContainerComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
            this.titleChange.emit(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PopupContainerComponent.prototype, "isAutoHeight", {
        get: function () {
            return this.height === 'auto';
        },
        enumerable: false,
        configurable: true
    });
    PopupContainerComponent.prototype.ngOnInit = function () {
        this.popupInit();
    };
    PopupContainerComponent.prototype.popupInit = function () {
        if (this.height !== 'auto') {
            this.autoContentContainerHeight = false;
        }
        if (this.fullScreen) {
            this.isFullScreenPopup = true;
        }
        else if (!this.fullScreen && this.fullScreenOnTablet) {
            this.isFullScreenPopup = this.deviceService.isTablet();
        }
        else if (!this.fullScreenOnTablet && this.fullScreenOnMobile) {
            this.isFullScreenPopup = this.deviceService.isMobile();
        }
        /**
         * Auto Fullscreen in case width/maxWidth greater than the window
         */
        if (this.autoFullScreenOnOverflow) {
            // TODO: Check this
            if (this.width !== 'auto' && this.width >= window.innerWidth) {
                this.isFullScreenPopup = true;
            }
        }
    };
    PopupContainerComponent.prototype.onResize = function () {
        if (this.popup !== undefined && this.popup.instance) {
            this.popupInit();
            this.popup.instance.repaint();
            this.popup.instance.refreshPosition();
        }
        if (this.scrollView !== undefined && this.scrollView.instance) {
            this.scrollView.instance.update();
        }
    };
    PopupContainerComponent.prototype.setVisibility = function (component, value) {
        var _this = this;
        var popupContent = component.content();
        if (!popupContent || !popupContent.parentNode) {
            return;
        }
        popupContent.parentNode.parentNode.style.visibility = value;
        setTimeout(function () {
            _this.isRendering = value === 'hidden';
        }, 100);
    };
    PopupContainerComponent.prototype.refreshPopupUI = function () {
        //
        // Repaint popup
        if (this.popup && this.popup.instance) {
            this.popup.instance.repaint();
            //
            // Refresh position for auto height popup
            if (this.isAutoHeight) {
                this.popup.instance.refreshPosition();
            }
        }
        //
        // Update scroll view height
        if (this.scrollView && this.scrollView.instance) {
            this.scrollView.instance.update();
        }
    };
    PopupContainerComponent.prototype.onPopupShowing = function (e) {
        if (!e || !e.component) {
            return;
        }
        if (this.isAutoHeight) {
            this.setVisibility(e.component, 'hidden');
        }
    };
    PopupContainerComponent.prototype.onPopupShowed = function (e) {
        if (!e || !e.component) {
            return;
        }
        this.refreshPopupUI();
        if (this.isAutoHeight) {
            this.setVisibility(e.component, 'unset');
        }
    };
    PopupContainerComponent.prototype.onPopupHidden = function (e) {
        this.visible = false;
    };
    PopupContainerComponent.prototype.onPopupHiding = function (e) {
        this.onHiding.emit();
    };
    __decorate([
        ViewChild('popup', { static: false })
    ], PopupContainerComponent.prototype, "popup", void 0);
    __decorate([
        ViewChild('scrollView', { static: false })
    ], PopupContainerComponent.prototype, "scrollView", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "visible", null);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "width", null);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "height", null);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "title", null);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "fullScreenOnMobile", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "fullScreenOnTablet", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "fullScreen", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "autoFullScreenOnOverflow", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "showCloseButton", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "shading", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "dragEnabled", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "footerTemplate", void 0);
    __decorate([
        Input()
    ], PopupContainerComponent.prototype, "headerTemplate", void 0);
    __decorate([
        Output()
    ], PopupContainerComponent.prototype, "visibleChange", void 0);
    __decorate([
        Output()
    ], PopupContainerComponent.prototype, "widthChange", void 0);
    __decorate([
        Output()
    ], PopupContainerComponent.prototype, "heightChange", void 0);
    __decorate([
        Output()
    ], PopupContainerComponent.prototype, "titleChange", void 0);
    __decorate([
        Output()
    ], PopupContainerComponent.prototype, "onHiding", void 0);
    __decorate([
        HostListener('window:resize')
    ], PopupContainerComponent.prototype, "onResize", null);
    PopupContainerComponent = __decorate([
        Component({
            selector: 'app-popup-container',
            templateUrl: './popup-container.component.html',
            styleUrls: ['./popup-container.component.scss']
        })
    ], PopupContainerComponent);
    return PopupContainerComponent;
}());
export { PopupContainerComponent };
//# sourceMappingURL=popup-container.component.js.map