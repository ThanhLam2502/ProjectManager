import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FilterPartnerModel, PartnerModel } from '@app/modules/admin/models/partner.model';
import { AppNotify } from '@app/utilities';
import DataSource from 'devextreme/data/data_source';
import { LoadParamModel } from '@app/modules/core/models';
var PartnersComponent = /** @class */ (function () {
    function PartnersComponent(partnerService) {
        this.partnerService = partnerService;
        this.filterPartner = new FilterPartnerModel();
        this.isOpenPartnerDetailPopup = false;
        this.dataPartner = new PartnerModel();
    }
    PartnersComponent.prototype.ngOnInit = function () {
        this.loadPartners();
    };
    PartnersComponent.prototype.loadPartners = function () {
        var _this = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var loadParams = new LoadParamModel(loadOptions, _this.filterPartner);
                return _this.partnerService.getPartners(loadParams).toPromise();
            }
        });
    };
    PartnersComponent.prototype.onSearchPartner = function (param) {
        this.filterPartner = param;
        this.loadPartners();
    };
    PartnersComponent.prototype.createPartner = function () {
        this.dataPartner = new PartnerModel();
        this.isOpenPartnerDetailPopup = true;
    };
    PartnersComponent.prototype.onPartnerDetail = function (param) {
        this.dataPartner = param;
        this.isOpenPartnerDetailPopup = true;
    };
    PartnersComponent.prototype.onDeletePartner = function (id, e) {
        this.selectedId = id;
        if (this.deleteDetailConfirmPopover) {
            this.deleteDetailConfirmPopover.show(e.currentTarget);
        }
    };
    PartnersComponent.prototype.onUpdatePartnerSuccess = function ($event) {
        this.isOpenPartnerDetailPopup = false;
        this.loadPartners();
    };
    PartnersComponent.prototype.deletePartner = function () {
        var _this = this;
        this.isProcessing = true;
        this.partnerService.deletePartner(this.selectedId).subscribe(function () {
            AppNotify.success('Deleted success');
            _this.loadPartners();
            _this.isProcessing = false;
        }, function (error) {
            _this.isProcessing = false;
        });
    };
    __decorate([
        ViewChild('deleteDetailConfirmPopover', { static: true })
    ], PartnersComponent.prototype, "deleteDetailConfirmPopover", void 0);
    PartnersComponent = __decorate([
        Component({
            selector: 'app-partners',
            templateUrl: './partners.component.html',
            styleUrls: ['./partners.component.scss']
        })
    ], PartnersComponent);
    return PartnersComponent;
}());
export { PartnersComponent };
//# sourceMappingURL=partners.component.js.map