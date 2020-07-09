# discount-engine

#### Project setup
1. Install nodejs
2. Install the dependencies using `npm install`

#### Project details
This is simple project which applies discount based on provided bill and discount.

This project exposes following APIS
* Register user -> Register user with existing bookings if any
* Register discount -> Register a new discount type which can consist `discount code`, `percentage` of discount or `amount` of discount and validity of that discount
* Register Bill -> Generate a bill for user, here either exisiting booking can be provided or it will create a new booking while generating the bill
* Apply discount -> Calcluates final payable amount based on discout and bill id provided

EntryPoint - `app.js`

Please refer to tests for having better understading of APIs.

NOTE: Since this is a test application, here all data is stored in in memory so after a session whole data will be lost.

#### Run tests
All tests are written using mocha and chai
run command `npm test` to execute tests