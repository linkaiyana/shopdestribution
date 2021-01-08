const PhoneReg = new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$');
// 校验号码
function validatePhone(phone) {
  if (!PhoneReg.test(phone)) {
    return false;
  }
  return true;
}

const PasswordReg = /^\w{10,15}$/;
// 校验密码
function validatePassword(password) {
  if (!PasswordReg.test(password)) {
    return false;
  }
  return true;
}

const EmailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
// 校验邮箱
function validateEmail(email) {
  if (!EmailReg.test(email)) {
    return false;
  }
  return true;
}

module.exports = {
  validatePhone,
  validatePassword,
  validateEmail,
};
