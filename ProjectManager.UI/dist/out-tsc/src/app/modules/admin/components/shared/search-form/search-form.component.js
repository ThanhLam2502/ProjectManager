import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { SearchFormDataModel } from '@app/modules/admin/models/search.model';
var SearchFormComponent = /** @class */ (function () {
    function SearchFormComponent() {
        this._request = new SearchFormDataModel();
        this.requestChange = new EventEmitter();
        this.onFilterAction = new EventEmitter();
        this.filterBooking = new SearchFormDataModel();
    }
    Object.defineProperty(SearchFormComponent.prototype, "request", {
        //
        get: function () {
            return this._request;
        },
        set: function (value) {
            this._request = value;
            this.requestChange.emit(value);
        },
        enumerable: false,
        configurable: true
    });
    SearchFormComponent.prototype.onSearch = function () {
        this.request = cloneDeep(this.filterBooking);
        this.onFilterAction.emit(this.filterBooking);
    };
    __decorate([
        Input()
    ], SearchFormComponent.prototype, "request", null);
    __decorate([
        Output()
    ], SearchFormComponent.prototype, "requestChange", void 0);
    __decorate([
        Output()
    ], SearchFormComponent.prototype, "onFilterAction", void 0);
    SearchFormComponent = __decorate([
        Component({
            selector: 'app-search-form',
            templateUrl: 'search-form.component.html',
            styleUrls: ['search-form.component.scss']
        })
    ], SearchFormComponent);
    return SearchFormComponent;
}());
export { SearchFormComponent };
//# sourceMappingURL=search-form.component.js.map