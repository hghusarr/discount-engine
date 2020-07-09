const DiscountEngine = require('./src/DiscountEngine');
const Discount = require('./src/Discount');
const User = require('./src/User');
const Bill = require('./src/Bill');

// Creating Single Instance for discount enginer at start of the Application
const discountingEngine = new DiscountEngine();

// In memory storages for different models
global.users = [];
global.discounts = [];
global.bills = [];

module.exports = {
  registerUser(userDetails) {
    const user = new User(userDetails);

    global.users.push(user);
  },

  registerDiscount(discountDetails) {
    const discount = new Discount(discountDetails);

    global.discounts.push(discount);
  },

  registerBill (billDetails) {
    const userId = billDetails.userId;

    if (User.isExistingUser(userId)) {
      const user = User.getUser(userId);
      const bill = new Bill(Object.assign(billDetails, { user }));

      global.bills.push(bill);
    }
  },

  applyDiscount (billId, discountId) {
    if (!Bill.isExistingBill(billId)) {
      return new Error('Bill is not available');
    }

    if (discountId && !Discount.isExistingDiscount(discountId)) {
      return new Error('Discount is not available');
    }

    const bill = Bill.getBill(billId);
    const discount = Discount.getDiscount(discountId);

    return discountingEngine.applyDiscount(bill, discount);
  }
}