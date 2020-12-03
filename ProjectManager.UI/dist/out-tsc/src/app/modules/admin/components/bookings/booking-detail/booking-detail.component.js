import { __decorate, __values } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingModel } from '@app/modules/admin/models';
import { AppNotify } from '@app/utilities';
import { BookingActivity } from '@app/modules/admin/shared/enums';
var BookingDetailComponent = /** @class */ (function () {
    function BookingDetailComponent(bookingsService) {
        var _a;
        this.bookingsService = bookingsService;
        this._visible = false;
        //
        this.selectedBooking = new BookingModel();
        //
        this.visibleChange = new EventEmitter();
        this.onSuccess = new EventEmitter();
        //
        this._activity = BookingActivity;
        this.editingBooking = new BookingModel();
        this.bookingActivities = (_a = {},
            _a[BookingActivity.Transportation] = false,
            _a[BookingActivity.IslandHopping] = false,
            _a[BookingActivity.Snorkeling] = false,
            _a[BookingActivity.ScubaDiving] = false,
            _a[BookingActivity.Overnight] = false,
            _a);
    }
    Object.defineProperty(BookingDetailComponent.prototype, "visible", {
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
    BookingDetailComponent.prototype.ngOnInit = function () {
        var e_1, _a;
        var _this = this;
        if (this.selectedBooking.id) {
            this.bookingsService.getBookingById(this.selectedBooking.id).subscribe(function (result) {
                _this.editingBooking = result;
            });
            if (this.editingBooking.activities && this.editingBooking.activities.length) {
                try {
                    for (var _b = __values(Object.keys(this.bookingActivities)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        if (this.editingBooking.activities.indexOf(key) !== -1) {
                            this.bookingActivities[key] = true;
                        }
                        else {
                            this.bookingActivities[key] = false;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    };
    BookingDetailComponent.prototype.submitForm = function (param) {
        var e_2, _a;
        var _this = this;
        if (!param.validationGroup.validate().isValid) {
            return false;
        }
        //
        this.editingBooking.activities = [];
        if (!this.bookingActivities[BookingActivity.Overnight]) {
            this.editingBooking.overnightD = null;
            this.editingBooking.overnightN = null;
        }
        try {
            for (var _b = __values(Object.keys(this.bookingActivities)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (this.bookingActivities[key]) {
                    this.editingBooking.activities.push(key);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        //
        console.log(this.editingBooking);
        this.bookingsService.saveBooking(this.editingBooking).subscribe(function (account) {
            var message = 'Created success';
            if (_this.editingBooking.id) {
                message = 'Updated success';
            }
            AppNotify.success(message);
            _this.onSuccess.emit(_this.editingBooking);
        }, function (error) {
            AppNotify.error();
        });
    };
    __decorate([
        Input()
    ], BookingDetailComponent.prototype, "selectedBooking", void 0);
    __decorate([
        Input()
    ], BookingDetailComponent.prototype, "visible", null);
    __decorate([
        Output()
    ], BookingDetailComponent.prototype, "visibleChange", void 0);
    __decorate([
        Output()
    ], BookingDetailComponent.prototype, "onSuccess", void 0);
    BookingDetailComponent = __decorate([
        Component({
            selector: 'app-booking-detail',
            templateUrl: './booking-detail.component.html',
            styleUrls: ['./booking-detail.component.scss']
        })
    ], BookingDetailComponent);
    return BookingDetailComponent;
}());
export { BookingDetailComponent };
//# sourceMappingURL=booking-detail.component.js.map