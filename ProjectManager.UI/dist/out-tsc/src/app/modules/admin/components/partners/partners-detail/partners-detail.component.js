import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartnerModel } from '@app/modules/admin/models/partner.model';
import { VALIDATION_REGEX } from '@app/shared/constants';
import { AppNotify } from '@app/utilities';
var PartnersDetailComponent = /** @class */ (function () {
    function PartnersDetailComponent(partnerService) {
        this.partnerService = partnerService;
        this['_visible'] = false;
        //
        this.selectedPartner = new PartnerModel();
        //
        this.visibleChange = new EventEmitter();
        this.onSuccess = new EventEmitter();
        //
        this.phoneRegex = VALIDATION_REGEX.phone;
        this.editingPartner = new PartnerModel();
        this.otherMessengers = [];
        this.categoryModel = [];
    }
    Object.defineProperty(PartnersDetailComponent.prototype, "visible", {
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
    PartnersDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.selectedPartner.id) {
            this.partnerService.getPartnerById(this.selectedPartner.id).subscribe(function (result) {
                _this.editingPartner = result;
            });
        }
        this.partnerService.getOtherMessengers().subscribe(function (result) {
            _this.otherMessengers = result;
        });
        this.partnerService.getCategorys().subscribe(function (result) {
            _this.categoryModel = result;
        });
    };
    PartnersDetailComponent.prototype.submitForm = function (param) {
        var _this = this;
        if (!param.validationGroup.validate().isValid) {
            return false;
        }
        this.partnerService.savePartner(this.editingPartner).subscribe(function (account) {
            var message = 'Created success';
            if (_this.editingPartner.id) {
                message = 'Updated success';
            }
            AppNotify.success(message);
            _this.onSuccess.emit(_this.editingPartner);
        }, function (error) {
        });
    };
    __decorate([
        Input()
    ], PartnersDetailComponent.prototype, "selectedPartner", void 0);
    __decorate([
        Input()
    ], PartnersDetailComponent.prototype, "visible", null);
    __decorate([
        Output()
    ], PartnersDetailComponent.prototype, "visibleChange", void 0);
    __decorate([
        Output()
    ], PartnersDetailComponent.prototype, "onSuccess", void 0);
    PartnersDetailComponent = __decorate([
        Component({
            selector: 'app-partners-detail',
            templateUrl: './partners-detail.component.html',
            styleUrls: ['./partners-detail.component.scss']
        })
    ], PartnersDetailComponent);
    return PartnersDetailComponent;
}());
export { PartnersDetailComponent };
//# sourceMappingURL=partners-detail.component.js.map