const moment = require('moment');
const Booking = require('./Booking');

class User {
  constructor (userDetails) {
    this.id = userDetails.id;
    this.joiningDate = userDetails.joiningDate ? new Date(userDetails.joiningDate) : new Date(Date.now());

    if (userDetails.bookings) {
      this.bookings = userDetails.bookings.map((booking) => new Booking(booking));

      // Add to global booking store
      global.bookings = global.bookings.concat(this.bookings);
    }
    else {
      this.bookings = [];
    }
  }

  static isExistingUser (id) {
    return global.users.map((user) => user.id).includes(id);
  }

  static getUser (id) {
    return global.users.find((user) => user.id === id);
  }

  addBooking (booking) {
    this.bookings.push(booking);
    global.bookings.push(booking);
  }

  _hasDoneBookings () {
    return this.bookings.length > 0;
  }

  isCustomerOverYear () {
    const joinDateMoment = moment(this.joiningDate);
    const currentDateMoment = moment(Date.now());

    return currentDateMoment.diff(joinDateMoment, 'years', true) >= 1;
  }

  isNewUser () {
    return !this._hasDoneBookings();
  }
};

module.exports = User;