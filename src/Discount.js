class Discount {  
  constructor (discountDetails) {
    this.id = discountDetails.id;
    this.code = discountDetails.code;
    this.percentage = discountDetails.percentage;
    this.amount = discountDetails.amount;
    this.startDate = new Date(discountDetails.startDate);
    this.endDate = new Date(discountDetails.endDate);
  }

  static isExistingDiscount (id) {
    return global.discounts.map((discount) => discount.id).includes(id);
  }

  static getDiscount (id) {
    return global.discounts.find((discount) => discount.id === id);
  }

  _isFirstTimeUserCoupen () {
    return this.code === 'FB200';
  }

  isValidCoupen () {
    const currentDate = Date.now();

    return currentDate > this.startDate && currentDate < this.endDate;
  }

  isValidForUser (user) {
    if (this._isFirstTimeUserCoupen()) {
      return user.isNewUser() && this.isValidCoupen();
    }

    return false;
  }

  applyCoupenDiscount (billAmount) {
    let discountAmount = 0;

    if (this.percentage) {
      discountAmount = billAmount * this.percentage / 100;
    }
    else if (this.amount) {
      discountAmount = this.amount;
    }

    return billAmount - discountAmount;
  }
}

module.exports = Discount;