import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PopoverTitleComponent = /** @class */ (function () {
    function PopoverTitleComponent() {
        this.onClose = new EventEmitter();
        this.isVisible = false;
    }
    PopoverTitleComponent.prototype.ngOnInit = function () {
    };
    PopoverTitleComponent.prototype.closePopover = function () {
        this.onClose.emit(true);
    };
    __decorate([
        Input()
    ], PopoverTitleComponent.prototype, "title", void 0);
    __decorate([
        Output()
    ], PopoverTitleComponent.prototype, "onClose", void 0);
    PopoverTitleComponent = __decorate([
        Component({
            selector: 'app-popover-title',
            templateUrl: './popover-title.component.html',
            styleUrls: ['./popover-title.component.scss']
        })
    ], PopoverTitleComponent);
    return PopoverTitleComponent;
}());
export { PopoverTitleComponent };
//# sourceMappingURL=popover-title.component.js.map