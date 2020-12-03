import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { BookingModel, FilterBookingModel } from '@app/modules/admin/models';
import { STATUS_METHOD } from '@app/modules/admin/shared/constant';
import { AppNotify } from '@app/utilities';
import { LoadParamModel } from '@app/modules/core/models';
import { BookingActivity } from '@app/modules/admin/shared/enums';
var BookingsComponent = /** @class */ (function () {
    function BookingsComponent(bookingsService) {
        var _a;
        this.bookingsService = bookingsService;
        this.filterBooking = new FilterBookingModel();
        this.dataBooking = new BookingModel();
        //
        this.statusBooking = STATUS_METHOD;
        this.isOpenBookingDetailPopup = false;
        this.isProcessing = false;
        this.overnight = 'overnight';
        this.bookingActivities = (_a = {},
            _a[BookingActivity.Transportation] = 'Transportation',
            _a[BookingActivity.IslandHopping] = 'Island hopping',
            _a[BookingActivity.Snorkeling] = 'Snorkeling',
            _a[BookingActivity.ScubaDiving] = 'Scuba diving',
            _a[BookingActivity.Overnight] = 'Overnight',
            _a);
    }
    BookingsComponent.prototype.ngOnInit = function () {
        this.loadBookings();
    };
    BookingsComponent.prototype.loadBookings = function () {
        var _this = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var loadParams = new LoadParamModel(loadOptions, _this.filterBooking);
                return _this.bookingsService.getBookings(loadParams).toPromise();
            }
        });
    };
    BookingsComponent.prototype.onSearchBooking = function (param) {
        this.filterBooking = param;
        this.loadBookings();
    };
    BookingsComponent.prototype.onBookingDetail = function (param) {
        this.dataBooking = param;
        this.isOpenBookingDetailPopup = true;
    };
    BookingsComponent.prototype.createBooking = function () {
        this.dataBooking = new BookingModel();
        this.isOpenBookingDetailPopup = true;
    };
    BookingsComponent.prototype.onDeleteBooking = function (id, e) {
        this.selectedId = id;
        if (this.deleteDetailConfirmPopover) {
            this.deleteDetailConfirmPopover.show(e.currentTarget);
        }
    };
    BookingsComponent.prototype.onUpdateBookingSuccess = function ($event) {
        this.isOpenBookingDetailPopup = false;
        this.loadBookings();
    };
    BookingsComponent.prototype.deleteBooking = function () {
        var _this = this;
        this.isProcessing = true;
        this.bookingsService.deleteBooking(this.selectedId).subscribe(function () {
            AppNotify.success('Deleted success');
            _this.loadBookings();
            _this.isProcessing = false;
        }, function (error) {
            AppNotify.error();
            _this.isProcessing = false;
        });
    };
    __decorate([
        ViewChild('deleteDetailConfirmPopover')
    ], BookingsComponent.prototype, "deleteDetailConfirmPopover", void 0);
    BookingsComponent = __decorate([
        Component({
            selector: 'app-bookings',
            templateUrl: './bookings.component.html',
            styleUrls: ['./bookings.component.scss']
        })
    ], BookingsComponent);
    return BookingsComponent;
}());
export { BookingsComponent };
//# sourceMappingURL=bookings.component.js.map