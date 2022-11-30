class AdminSignInDetails{
  constructor(signInEmail, signInPassword, signInConfirmPassword) {
      this.signInEmail = signInEmail;
      this.signInPassword = signInPassword;
      this.signInConfirmPassword = signInConfirmPassword;
  }
}

// UI handler
class AdminUI{
  static showAlert(msg, className) {
    const div = document.querySelector('#alert-box-container')
    div.className = `alert ${className}`;

    div.innerText = msg

    setTimeout(() => {

        document.querySelector('#alert-box-container').className = ""
        document.querySelector('#alert-box-container').innerText = "";
    }, 3000);
}
  static showAlertLogin(msg, className, divSelect) {
    const div2 = document.getElementById(divSelect)
    div2.className = `alert ${className}`;
    div2.innerText = msg
    setTimeout(() => {
        document.getElementById(divSelect).className = ""
        document.getElementById(divSelect).innerText = "";
    }, 3000);
}
static clearField(){
  document.querySelector('#sign-in-email').value = '';
  document.querySelector('#sign-in-password').value = '';
  document.querySelector('#sign-in-confirm-password').value = '';
  document.querySelector('#login-email').value = '';
  document.querySelector('#login-password').value = '';
}
}

class Store{
  static getAdminSignInDetails() {
    let adminDetails;
    if(localStorage.getItem('recieptAdminDetails') === null) {
      adminDetails = [];
    } else {
      adminDetails = JSON.parse(localStorage.getItem('recieptAdminDetails'));
    }
    return adminDetails;
  }
  static addToStorage(adminSignInDetails) {
    const adminDetails = Store.getAdminSignInDetails();
    adminDetails.push(adminSignInDetails);
    localStorage.setItem('recieptAdminDetails', JSON.stringify(adminDetails));
    console.log(adminDetails)
  }
}

// form submission
document.querySelector('#sign-in-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const signInEmail = document.getElementById('sign-in-email').value;
   const signInPassword = document.getElementById('sign-in-password').value;
   const signInConfirmPassword =  document.getElementById('sign-in-confirm-password').value;
    const adminSignInDetails = new AdminSignInDetails(signInEmail, signInPassword, signInConfirmPassword);
    const adminDetails = Store.getAdminSignInDetails();
    let counter = 0;
    adminDetails.forEach((adminDetail)=>{
      if(adminDetail.signInEmail === signInEmail){
        counter++;
      }
    })
  if(signInEmail == '' || signInPassword == '' || signInConfirmPassword == ''){
    AdminUI.showAlert("Please fill in all field", "error");
        return false;
  }else if(signInConfirmPassword !== signInPassword){
    AdminUI.showAlert("Password Unmatched", "error");
    return false;
  }else if(counter !== 0){
    AdminUI.showAlert("User already exist", "error");
        return false;
  }else{
    AdminUI.showAlert("You have successfully sign up", "success");
    Store.addToStorage(adminSignInDetails)
    AdminUI.clearField()
  }
})
document.querySelector('#loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const loginEmail = document.querySelector('#login-email').value;
  const loginPassword = document.querySelector('#login-password').value;
  if(loginEmail === '' || loginPassword === ''){
    AdminUI.showAlertLogin("Please fill in all field", "error","alert-box-login");
        return false;
  }else{
    const adminDetails = Store.getAdminSignInDetails();
    let counter = 0;
    adminDetails.forEach((adminDetail)=>{
      if(loginEmail === adminDetail.signInEmail && loginPassword === adminDetail.signInPassword){
        counter++;
      }
    })
    if(counter !== 0){
      AdminUI.showAlertLogin("Login Successful", "success","alert-box-login");
      AdminUI.clearField();
      setTimeout(()=>{
        window.location.replace("homepage.html");
      },2000)
    }else{
      AdminUI.showAlertLogin("User not exist", "error","alert-box-login");
      return false;
    }
  }
})

document.querySelector('#security-form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const secEmail = document.querySelector('#sec-email').value;
  let seePassword = document.querySelector('#see-password');

  if(secEmail === ''){
    AdminUI.showAlertLogin("Please fill in field", "error", "alert-box-security");
        return false;
  }else{
    const adminDetails = Store.getAdminSignInDetails();
    let retrievedPassword;
    adminDetails.forEach((adminDetail)=>{
      if(adminDetail.signInEmail === secEmail){
        retrievedPassword = adminDetail.signInPassword;
      }
    })
    if(retrievedPassword === undefined){
      seePassword.className = 'text-danger';
      seePassword.textContent = "The email you enter doesn't exist";
    }else{
      seePassword.className = 'text-success';
      seePassword.textContent = `Your password is ${retrievedPassword}`;
    }
  }
})