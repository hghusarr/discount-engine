class Booking {
  constructor (bookingDetails) {
    this.id = bookingDetails.id;
    this.type = bookingDetails.type;
  }

  static isExistingBooking (id) {
    return global.bookings.map((booking) => booking.id).includes(id);
  }

  static getBooking (id) {
    return global.bookings.find((booking) => booking.id === id);
  }
};

module.exports = Booking;