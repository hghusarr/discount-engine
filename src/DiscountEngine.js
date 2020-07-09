class DiscountEngine {
  _getPrecentageDiscount (amount, percentage) {
    return amount * percentage / 100;
  }

  applyDiscount (bill, discount) {
    const user = bill.user;

    let billAmount = bill.amount;

    if (user.isNewUser()) {
      billAmount -= 100;
    }

    if (user.isCustomerOverYear()) {
      billAmount -= this._getPrecentageDiscount(billAmount, 5);
    }

    if (discount && discount.isValidForUser(user)) {
      billAmount = discount.applyCoupenDiscount(billAmount);
    }

    return billAmount;
  }
};

module.exports = DiscountEngine;