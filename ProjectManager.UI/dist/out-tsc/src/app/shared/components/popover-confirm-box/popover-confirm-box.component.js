import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var PopoverConfirmBoxComponent = /** @class */ (function () {
    function PopoverConfirmBoxComponent() {
        this.yesButtonType = 'default';
        this.position = 'bottom';
        this.width = 'auto';
        this.onConfirm = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    PopoverConfirmBoxComponent.prototype.ngOnInit = function () {
    };
    PopoverConfirmBoxComponent.prototype.confirm = function () {
        this.popover.instance.hide();
        this.onConfirm.emit(this.data);
    };
    PopoverConfirmBoxComponent.prototype.cancel = function () {
        this.popover.instance.hide();
        this.onCancel.emit(this.data);
    };
    PopoverConfirmBoxComponent.prototype.onHidden = function () {
        this.onHide.emit(this.data);
    };
    PopoverConfirmBoxComponent.prototype.hide = function () {
        this.popover.instance.hide();
    };
    PopoverConfirmBoxComponent.prototype.show = function (target, data) {
        if (target === void 0) { target = null; }
        if (data === void 0) { data = null; }
        if (this.popover) {
            this.popover.instance.show(target);
        }
        this.data = data;
    };
    PopoverConfirmBoxComponent.prototype.option = function (name) {
        return this.popover.instance.option(name);
    };
    __decorate([
        ViewChild('popover', { static: true })
    ], PopoverConfirmBoxComponent.prototype, "popover", void 0);
    __decorate([
        Input()
    ], PopoverConfirmBoxComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], PopoverConfirmBoxComponent.prototype, "message", void 0);
    __decorate([
        Input()
    ], PopoverConfirmBoxComponent.prototype, "yesButtonType", void 0);
    __decorate([
        Input()
    ], PopoverConfirmBoxComponent.prototype, "position", void 0);
    __decorate([
        Input()
    ], PopoverConfirmBoxComponent.prototype, "width", void 0);
    __decorate([
        Output()
    ], PopoverConfirmBoxComponent.prototype, "onConfirm", void 0);
    __decorate([
        Output()
    ], PopoverConfirmBoxComponent.prototype, "onCancel", void 0);
    __decorate([
        Output()
    ], PopoverConfirmBoxComponent.prototype, "onHide", void 0);
    PopoverConfirmBoxComponent = __decorate([
        Component({
            selector: 'app-popover-confirm-box',
            templateUrl: './popover-confirm-box.component.html',
            styleUrls: ['./popover-confirm-box.component.scss']
        })
    ], PopoverConfirmBoxComponent);
    return PopoverConfirmBoxComponent;
}());
export { PopoverConfirmBoxComponent };
//# sourceMappingURL=popover-confirm-box.component.js.map