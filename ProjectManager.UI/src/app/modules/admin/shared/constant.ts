import { StatusBooking } from '@app/modules/admin/shared/enums';

export const ADMIN_MENU = [
  {
    text: 'ProjectMangager',
    link: '/admin/projects',
    icon: 'fas fa-home'
  },
];

export const STATUS_METHOD: { value: StatusBooking, name: string }[] = [
  { value: StatusBooking.Paid, name: 'Paid' },
  { value: StatusBooking.Complete, name: 'Complete' },
  { value: StatusBooking.BookingAccepted, name: 'Booking accepted' },
  { value: StatusBooking.BookingRequested, name: 'Booking requested' }
];

export const PROJECT_STATUS: {id: number, value: string}[] = [
  { id: 1, value: 'Open' },
  { id: 2, value: 'Close' },
];
