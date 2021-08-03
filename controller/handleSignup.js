const User = require("../model/user");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = handleSignup = async (req, res) => {
  const {
    signupEmail,
    signupPassword,
    signupAddress,
    signupCity,
    signupProvince,
    signupPincode,
  } = req.body;
  let tempUser = {};
  tempUser.email = signupEmail;
  tempUser.password = bcrypt.hashSync(signupPassword, salt);
  tempUser.address = signupAddress;
  tempUser.city = signupCity;
  tempUser.province = signupProvince;
  tempUser.pincode = signupPincode;
  tempUser.isAdmin = false;
  let user = new User(tempUser);
  console.log(user);

  await user.save((err) => {
    if (err) {
      return res.json({ success: false, statusCode: 500, message: err });
    } else {
      //sendEmail(user.email);
      return res.render("userDashboard", {
        email: user.email,
        success: true,
        statusCode: 200,
        message: "signed up successfully!",
      });
    }
  });
};
