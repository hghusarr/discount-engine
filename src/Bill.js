class Bill {
  constructor (billDetails) {
    this.id = billDetails.id;
    this.amount = billDetails.amount;
    this.user = billDetails.user;
  }

  static isExistingBill (id) {
    return global.bills.map((bill) => bill.id).includes(id);
  }

  static getBill (id) {
    return global.bills.find((bill) => bill.id === id);
  }
}

module.exports = Bill;