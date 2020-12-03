import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
var AutoFocusInputDirective = /** @class */ (function () {
    function AutoFocusInputDirective(el) {
        var _this = this;
        this.inputOrder = 1;
        this.timeout = 1000; // TODO: Refactor
        setTimeout(function () {
            var inputs = el.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea, select');
            if (inputs.length) {
                var inputIndex = _this.inputOrder - 1;
                if (inputIndex < 0) {
                    inputIndex = 0;
                }
                inputs[inputIndex].focus();
            }
        }, this.timeout);
    }
    __decorate([
        Input()
    ], AutoFocusInputDirective.prototype, "inputOrder", void 0);
    __decorate([
        Input()
    ], AutoFocusInputDirective.prototype, "timeout", void 0);
    AutoFocusInputDirective = __decorate([
        Directive({
            selector: '[appAutoFocusInput]'
        })
    ], AutoFocusInputDirective);
    return AutoFocusInputDirective;
}());
export { AutoFocusInputDirective };
//# sourceMappingURL=auto-focus-input.directive.js.map