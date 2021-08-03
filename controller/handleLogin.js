const User = require("./../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = handleLogin = async (req, res) => {
  User.findOne({ email: req.body.loginEmail }, (err, user) => {
    if (err) {
      return res.json({ success: false, statusCode: 500, message: err });
    } else if (!user) {
      res.json({
        success: false,
        statusCode: 403,
        message: "User not found",
      });
    } else {
      console.log(decodeURIComponent(req.body.loginPassword), user.password);
      if (
        !bcrypt.compareSync(
          decodeURIComponent(req.body.loginPassword),
          user.password
        )
      ) {
        return res.json({
          success: false,
          statusCode: 403,
          message: "Wrong password",
        });
      } else {
        var token = jwt.sign(
          JSON.parse(JSON.stringify(user)),
          `${process.env.secret}`,
          {
            expiresIn: 1440,
          }
        );
        if (user.isAdmin)
          return res.render("adminDashboard", {
            email: user.email,
            success: true,
            statusCode: 200,
            message: "Logged in successfully",
            token: token,
            isAdmin: user.isAdmin,
          });
        else
          return res.render("userDashboard", {
            email: user.email,
            success: true,
            statusCode: 200,
            message: "Logged in successfully",
            token: token,
            isAdmin: user.isAdmin,
          });
      }
    }
  });
};
