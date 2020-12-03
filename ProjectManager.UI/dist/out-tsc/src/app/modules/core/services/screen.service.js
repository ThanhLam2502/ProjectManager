import { __decorate } from "tslib";
import { Output, Injectable, EventEmitter } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
var ScreenService = /** @class */ (function () {
    function ScreenService(breakpointObserver) {
        var _this = this;
        this.breakpointObserver = breakpointObserver;
        this.changed = new EventEmitter();
        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
            .subscribe(function () { return _this.changed.next(); });
    }
    ScreenService.prototype.isLargeScreen = function () {
        var isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
        var isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);
        return isLarge || isXLarge;
    };
    Object.defineProperty(ScreenService.prototype, "sizes", {
        get: function () {
            return {
                'screen-x-small': this.breakpointObserver.isMatched(Breakpoints.XSmall),
                'screen-small': this.breakpointObserver.isMatched(Breakpoints.Small),
                'screen-medium': this.breakpointObserver.isMatched(Breakpoints.Medium),
                'screen-large': this.isLargeScreen(),
            };
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Output()
    ], ScreenService.prototype, "changed", void 0);
    ScreenService = __decorate([
        Injectable()
    ], ScreenService);
    return ScreenService;
}());
export { ScreenService };
//# sourceMappingURL=screen.service.js.map