const signupButton = document.getElementById("signupButton");
const loginButton = document.getElementById("loginButton");

const sendEmail = (reciever) => {
  Email.send({
    SecureToken: "f71a15df-c5c8-49d3-bedb-eb5880a93ff8",
    To: reciever,
    From: "mdhruvin946@gmail.com",
    Subject: "Welcome to Airbnb",
    Body: "This is the body section!",
  });
};

const validatePassword = (password) => {
  if (password.length < 6 || password.length > 12) {
    return false;
  } else return true;
};

const validateEmail = (email) => {
  if (email.length < 5) {
    return false;
  }
  let check = false;
  for (let i = 0; i < email.length; i++) {
    if (email[i] == "@") {
      check = true;
      break;
    }
  }
  if (!check) return false;
  check = false;
  for (let i = 0; i < email.length; i++) {
    if (email[i] == ".") {
      check = true;
      break;
    }
  }
  if (!check) return false;
  return true;
};

const validatePostalcode = (pincode) => {
  if (pincode.length == 6) {
    return true;
  } else return false;
};

const validateSignup = () => {
  console.log("signup validation started!");
  const signupEmail = document.querySelector("#signupEmail");
  const signupPassword = document.querySelector("#signupPassword");
  const signupAddress = document.querySelector("#signupAddress");
  const signupCity = document.querySelector("#signupCity");
  const signupProvince = document.querySelector("#signupProvince");
  const signupPincode = document.querySelector("#signupPincode");

  if (!validateEmail(signupEmail.value)) {
    alert("Email should be properly formatted");
  } else if (!validatePassword(signupPassword.value)) {
    alert("Password length should be between 6 and 12 inclusive");
  } else if (signupAddress && signupAddress.value.length == 0) {
    alert("Please enter a valid address");
  } else if (signupCity && signupCity.value.length == 0) {
    alert("Please enter a valid city");
  } else if (!signupProvince.value) {
    alert("Please select a province");
  } else if (!validatePostalcode(signupPincode.value)) {
    alert("Postal code format: 'X0X0X0'");
  } else {
    sendEmail(signupEmail);
    document.forms["signupForm"].submit();
  }
  console.log("signup validation ended!");
};

const validateLogin = () => {
  console.log("login validation started!");
  const loginEmail = document.querySelector("#loginEmail");
  const loginPassword = document.querySelector("#loginPassword");

  if (loginEmail.value.length == 0) {
    alert("Please enter email");
  } else if (loginPassword.value.length == 0) {
    alert("Please enter password");
  } else {
    document.forms["loginForm"].submit();
  }
};

signupButton && signupButton.addEventListener("click", validateSignup);
loginButton && loginButton.addEventListener("click", validateLogin);
