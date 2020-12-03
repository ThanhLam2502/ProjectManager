import { __extends } from "tslib";
import { AddressModel } from '@app/modules/core/models';
import { RegisterBaseModel } from '@app/modules/core/models/register-base.model';
var CompanyRegisterModel = /** @class */ (function (_super) {
    __extends(CompanyRegisterModel, _super);
    function CompanyRegisterModel(init) {
        var _this = _super.call(this, init) || this;
        _this.company = new CompanyModel();
        Object.assign(_this, init);
        return _this;
    }
    return CompanyRegisterModel;
}(RegisterBaseModel));
export { CompanyRegisterModel };
var EmployeeRegisterModel = /** @class */ (function (_super) {
    __extends(EmployeeRegisterModel, _super);
    function EmployeeRegisterModel(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return EmployeeRegisterModel;
}(RegisterBaseModel));
export { EmployeeRegisterModel };
var CompanyModel = /** @class */ (function () {
    function CompanyModel(init) {
        this.gts = false;
        // Enter fields
        this.address = new AddressModel();
        if (init) {
            Object.assign(this, init);
        }
    }
    return CompanyModel;
}());
export { CompanyModel };
//# sourceMappingURL=register.model.js.map