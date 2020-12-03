import { of } from 'rxjs';
import { environment } from '@environment';
import { randomCategorys, randomOtherMessengers, randomPartnerById, randomPartners } from '@app/data/admin/partner.mock';
import { random } from 'lodash';
var PartnerService = /** @class */ (function () {
    function PartnerService() {
    }
    PartnerService.prototype.getPartners = function (param) {
        if (environment.production) {
            console.log('API: getPartners');
        }
        return of({
            data: randomPartners(30),
            totalCount: random(50, 100)
        });
    };
    PartnerService.prototype.getPartnerById = function (param) {
        if (environment.production) {
            console.log('API: getPartnerById');
        }
        return of(randomPartnerById(param));
    };
    PartnerService.prototype.savePartner = function (param) {
        if (environment.production) {
            console.log('API: savePartner');
        }
        return of(true);
    };
    PartnerService.prototype.deletePartner = function (param) {
        if (environment.production) {
            console.log('API: deletePartner');
        }
        return of(true);
    };
    PartnerService.prototype.getOtherMessengers = function () {
        if (environment.production) {
            console.log('API: getPartner');
        }
        return of(randomOtherMessengers());
    };
    PartnerService.prototype.getCategorys = function () {
        if (environment.production) {
            console.log('API: getCategorys');
        }
        return of(randomCategorys());
    };
    return PartnerService;
}());
export { PartnerService };
//# sourceMappingURL=partner.services.js.map