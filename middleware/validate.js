const validator = require("../helpers/validate");

const validateEmployee = (req, res, next) => {
  const rules = {
    employeeId: "required|numeric|min:1|max:999999",
    name: "required|string",
    lastName: "required|string",
    email: "required|email",
    mobileNumber: "numeric|digits_between:7,15",
    position: "required|string",
    department: "required|string",
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      res
        .status(412)
        .send({ success: false, message: "Validation failed", data: err });
    } else {
      next();
    }
  });
};

module.exports = validateEmployee;
