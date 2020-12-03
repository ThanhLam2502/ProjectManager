import { of } from 'rxjs';
import { environment } from '@environment';
import { randomPartnerById } from '@app/data/admin/partner.mock';
import { random } from 'lodash';
import { randomBoats } from '@app/data/admin/boat.mock';
var BoatService = /** @class */ (function () {
    function BoatService() {
    }
    BoatService.prototype.getBoats = function (param) {
        if (environment.production) {
            console.log('API: getBoats');
        }
        return of({
            data: randomBoats(30),
            totalCount: random(50, 100)
        });
    };
    BoatService.prototype.getBoatById = function (param) {
        if (environment.production) {
            console.log('API: getBoatById');
        }
        return of(randomPartnerById(param));
    };
    BoatService.prototype.saveBoat = function (param) {
        if (environment.production) {
            console.log('API: saveBoat');
        }
        return of(true);
    };
    BoatService.prototype.deleteBoat = function (param) {
        if (environment.production) {
            console.log('API: deleteBoat');
        }
        return of(true);
    };
    return BoatService;
}());
export { BoatService };
//# sourceMappingURL=boat.services.js.map