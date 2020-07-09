const expect  = require('chai').expect;
const app = require('../app');

describe('Discount engine', function () {
  afterEach(function () {
    global.users = [];
    global.discounts = [];
    global.bills = [];
  });

  describe('apply discount', function () {
    it('should throw error if billId is not registered', function () {
      expect(app.applyDiscount(1234)).to.be.an.instanceOf(Error);
    });

    it('should throw error if discountId is provided and discountId is not registered', function () {
      app.registerUser({ id: 1 });
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234, 1234)).to.be.an.instanceOf(Error);
    });

    it('should not throw error if registered billId is provided without discountId', function () {
      app.registerUser({ id: 1 });
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234)).to.not.be.an.instanceOf(Error);
    });

    it('should apply discount of 100 if user has not done any bookings', function () {
      app.registerUser({ id: 1 });
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234)).to.equal(1134);
    });

    it('should not apply discount of 100 if user has done booking previously', function () {
      app.registerUser({ id: 1, bookings: [{ id: 'booking-id' }] });
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234)).to.equal(1234);
    });

    it('should not apply discount of 100 if user has done booking previously and applied first time user discount', function () {
      app.registerUser({ id: 1 });
      app.registerDiscount({ id: 'dicount-id', code: 'FB200', amount: 200, startDate: 1594265674006, endDate: 1595265674006 })
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234, 'dicount-id')).to.equal(934);
    });

    it('should not apply discount of 100 if user has done booking previously and applied expired discount', function () {
      app.registerUser({ id: 1 , bookings: [{ id: '1234' }]});
      app.registerDiscount({ id: 'dicount-id', code: 'FB200', amount: 200, startDate: 1594265674006, endDate: 1594265674006 })
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234, 'dicount-id')).to.equal(1234);
    });

    it('should apply 5% discount if user is already customer for more than year', function () {
      app.registerUser({ id: 1 , bookings: [{ id: '1234' }], joiningDate: 1594255674006 });
      app.registerDiscount({ id: 'dicount-id', code: 'FB200', amount: 200, startDate: 1594265674006, endDate: 1594265674006 })
      app.registerBill({ id: 1234, userId: 1, amount: 1234 });

      expect(app.applyDiscount(1234, 'dicount-id')).to.equal(1234);
    });
  });
})