import { AddressModel } from '@app/modules/core/models/address.model';
var RegisterBaseModel = /** @class */ (function () {
    function RegisterBaseModel(init) {
        this.address = new AddressModel();
        Object.assign(this, init);
    }
    return RegisterBaseModel;
}());
export { RegisterBaseModel };
//# sourceMappingURL=register-base.model.js.map