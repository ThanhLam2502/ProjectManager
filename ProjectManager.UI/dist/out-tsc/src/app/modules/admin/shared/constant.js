import { StatusBooking } from '@app/modules/admin/shared/enums';
export var ADMIN_MENU = [
    {
        text: 'Dashboard',
        link: '/admin/dashboard',
        icon: 'fas fa-home'
    },
    {
        text: 'Bookings',
        link: '/admin/bookings',
        icon: 'fas fa-address-book'
    },
    {
        text: 'User List',
        link: '/admin/users',
        icon: 'fas fa-users'
    },
    {
        text: 'Boats',
        icon: 'fas fa-ship',
        link: '/admin/boats',
        items: [
            {
                text: 'Partner List',
                link: '/admin/boats/partners'
            },
            {
                text: 'Boat List',
                link: '/admin/boats/list'
            },
            {
                text: 'Schedule',
                link: '/admin/boats/schedule'
            }
        ]
    },
    {
        text: 'Revenue',
        link: '/admin/revenue',
        icon: 'fas fa-funnel-dollar'
    }
];
export var STATUS_METHOD = [
    { value: StatusBooking.Paid, name: 'Paid' },
    { value: StatusBooking.Complete, name: 'Complete' },
    { value: StatusBooking.BookingAccepted, name: 'Booking accepted' },
    { value: StatusBooking.BookingRequested, name: 'Booking requested' }
];
export var PROJECT_STATUS = [
    { id: 1, value: 'Open' },
    { id: 2, value: 'Close' },
];
//# sourceMappingURL=constant.js.map