import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { LoadParamModel } from '@app/modules/core/models';
import { FilterBoatModel } from '@app/modules/admin/models/boat.model';
import { AppNotify } from '@app/utilities';
var BoatsComponent = /** @class */ (function () {
    function BoatsComponent(boatService) {
        this.boatService = boatService;
        this.filterBoat = new FilterBoatModel();
    }
    BoatsComponent.prototype.ngOnInit = function () {
        this.loadBoats();
    };
    BoatsComponent.prototype.loadBoats = function () {
        var _this = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var loadParams = new LoadParamModel(loadOptions, _this.filterBoat);
                return _this.boatService.getBoats(loadParams).toPromise();
            }
        });
    };
    BoatsComponent.prototype.onSearchBoat = function (filterBoat) {
        this.filterBoat = filterBoat;
        this.loadBoats();
    };
    BoatsComponent.prototype.createBoat = function () {
    };
    BoatsComponent.prototype.onBoatDetail = function (data) {
    };
    BoatsComponent.prototype.onDeleteBoat = function (id, e) {
        this.selectedId = id;
        if (this.deleteDetailConfirmPopover) {
            this.deleteDetailConfirmPopover.show(e.currentTarget);
        }
    };
    BoatsComponent.prototype.onUpdateBoatSuccess = function ($event) {
    };
    BoatsComponent.prototype.deleteBoat = function () {
        var _this = this;
        this.isProcessing = true;
        this.boatService.deleteBoat(this.selectedId).subscribe(function () {
            AppNotify.success('Deleted success');
            _this.loadBoats();
            _this.isProcessing = false;
        }, function (error) {
            AppNotify.error();
            _this.isProcessing = false;
        });
    };
    __decorate([
        ViewChild('deleteDetailConfirmPopover')
    ], BoatsComponent.prototype, "deleteDetailConfirmPopover", void 0);
    BoatsComponent = __decorate([
        Component({
            selector: 'app-boats',
            templateUrl: './boats.component.html',
            styleUrls: ['./boats.component.scss']
        })
    ], BoatsComponent);
    return BoatsComponent;
}());
export { BoatsComponent };
//# sourceMappingURL=boats.component.js.map