const moment = require('moment');

class User {
  constructor (userDetails) {
    this.id = userDetails.id;
    this.joiningDate = userDetails.joiningDate ? new Date(userDetails.joiningDate) : new Date(Date.now());
    this.bookings = userDetails.bookings || [];
  }

  static isExistingUser (id) {
    return global.users.map((user) => user.id).includes(id);
  }

  static getUser (id) {
    return global.users.find((user) => user.id === id);
  }

  _hasDoneBookings () {
    return this.bookings.length > 0;
  }

  isCustomerOverYear () {
    const joinDateMoment = moment(this.joiningDate);
    const currentDateMoment = moment(Date.now());

    return currentDateMoment.diff(joinDateMoment, 'years', true) === 1;
  }

  isNewUser () {
    return !this._hasDoneBookings();
  }
};

module.exports = User;