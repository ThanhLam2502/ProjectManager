import { of } from 'rxjs';
import { random } from 'lodash';
//
import { randomBookingById, randomBookings } from '@app/data/admin';
//
import { environment } from '@environment';
var BookingService = /** @class */ (function () {
    function BookingService() {
    }
    BookingService.prototype.getBookings = function (param) {
        if (environment.production) {
            console.log('API: getBookings');
        }
        return of({
            data: randomBookings(30),
            totalCount: random(50, 100)
        });
    };
    BookingService.prototype.getBookingById = function (param) {
        if (environment.production) {
            console.log('API: getBookingById');
        }
        return of(randomBookingById(param));
    };
    BookingService.prototype.saveBooking = function (param) {
        if (environment.production) {
            console.log('API: saveBooking');
        }
        return of(true);
    };
    BookingService.prototype.deleteBooking = function (param) {
        if (environment.production) {
            console.log('API: deleteSalesOrders');
        }
        return of(true);
    };
    return BookingService;
}());
export { BookingService };
//# sourceMappingURL=booking.services.js.map