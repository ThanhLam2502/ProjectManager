export var StatusBooking;
(function (StatusBooking) {
    StatusBooking[StatusBooking["Complete"] = 1] = "Complete";
    StatusBooking[StatusBooking["Paid"] = 2] = "Paid";
    StatusBooking[StatusBooking["BookingAccepted"] = 3] = "BookingAccepted";
    StatusBooking[StatusBooking["BookingRequested"] = 4] = "BookingRequested";
})(StatusBooking || (StatusBooking = {}));
export var BookingActivity;
(function (BookingActivity) {
    BookingActivity["Transportation"] = "transportation";
    BookingActivity["IslandHopping"] = "islandHopping";
    BookingActivity["Snorkeling"] = "snorkeling";
    BookingActivity["ScubaDiving"] = "scubaDiving";
    BookingActivity["Overnight"] = "overnight";
})(BookingActivity || (BookingActivity = {}));
//# sourceMappingURL=enums.js.map