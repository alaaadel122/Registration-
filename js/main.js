var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var userNameInput = document.getElementById('userName');
var loginBtn = document.getElementById('loginBtn')
var signUpBtn = document.getElementById('signUpBtn')
var registerBtn = document.getElementById('registerBtn')
var nameDiv = document.getElementById('nameDiv');
var errorMsg = document.getElementById('errorMsg')
var formTitle = document.getElementById('formTitle')
var signInBtn = document.getElementById('signInBtn')
var actionLogin = document.getElementById('actionLogin')
var actionSignUp = document.getElementById('actionSignUp')
var home = document.getElementById('home')
var formSection = document.getElementById('login')
var loginInfo = document.getElementById('loginInfo')
var navbarName = document.getElementById('navbarName')
var signOut = document.getElementById('signOut')
var currentUser;
if (JSON.parse(localStorage.getItem('currentUser')) !== null) {
     currentUser = JSON.parse(localStorage.getItem('currentUser'))
     home.classList.replace('d-none', 'd-block')
     formSection.classList.add('d-none')
     loginInfo.innerHTML = `Welcome ${currentUser.userName}`
     loginInfo.classList.add('text-white')
     navbarName.innerHTML = `${currentUser.userName.toUpperCase()}`
     navbarName.classList.add('text-white')


} else {
     currentUser = ''
     home.classList.replace('d-block', 'd-none')
     formSection.classList.replace('d-none', 'd-block')

}
var users;
if (JSON.parse(localStorage.getItem('users'))) {
     users = JSON.parse(localStorage.getItem('users'))
} else {
     users = []
}
loginBtn.addEventListener('click', function () {
     checkLogin()
})
registerBtn.addEventListener('click', function () {
     nameDiv.classList.replace('d-none', 'd-block')
     formTitle.innerHTML = 'Sign Up'
     loginBtn.classList.replace('d-block', 'd-none')
     signUpBtn.classList.replace('d-none', 'd-block')
     actionLogin.classList.replace('d-none', 'd-block')
     actionSignUp.classList.replace('d-block', 'd-none')
})
signInBtn.addEventListener('click', function () {
     convertToLogin()
})
signOut.addEventListener('click', function () {
     signout()
})
function convertToLogin() {
     errorMsg.classList.add('d-none')
     nameDiv.classList.replace('d-block', 'd-none')
     formTitle.innerHTML = 'Login'
     loginBtn.classList.replace('d-none', 'd-block')
     signUpBtn.classList.replace('d-block', 'd-none')
     actionLogin.classList.replace('d-block', 'd-none')
     actionSignUp.classList.replace('d-none', 'd-block')

}
signUpBtn.addEventListener('click', function () {
     signUp()
})
function clear() {
     userNameInput.value = ""
     passwordInput.value = ""
     emailInput.value = ""
}
function signUp() {
     console.log(emailInput.value)
     var emailExists = users.some(function (user) {
          return user.email === emailInput.value;
     });

     if (emailExists) {
          errorMsg.classList.replace('d-none', 'd-block');
          errorMsg.innerHTML = "This email already exists";
          return;
     }

     // Validate the email format
     if (!validEmail()) {
          errorMsg.classList.replace('d-none', 'd-block');
          errorMsg.innerHTML = "This email is invalid";
          return;
     }

     // Add the new user
     var user = {
          userName: userNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
     };
     users.push(user);
     localStorage.setItem('users', JSON.stringify(users));
     convertToLogin();
     console.log('User added');
     clear();
}
function validEmail() {
     let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if (regex.test(emailInput.value)) {

          return true;
     } else {

          return false
     }
}
function checkLogin() {
     var loginUser = {
          email: emailInput.value,
          password: passwordInput.value
     };
     var found = false;
     for (var i = 0; i < users.length; i++) {
          if (loginUser.email === users[i].email && loginUser.password === users[i].password) {
               loginUser.userName = users[i].userName
               console.log('hello ' + loginUser);
               found = true;
               currentUser = loginUser;
               localStorage.setItem('currentUser', JSON.stringify(loginUser))
               home.classList.replace('d-none', 'd-block')
               formSection.classList.add('d-none')
               loginInfo.innerHTML = `Welcome ${users[i].userName}`
               loginInfo.classList.add('text-white')
               navbarName.innerHTML = `${users[i].userName.toUpperCase()}`
               navbarName.classList.add('text-white')
               

               break;
          } else {
               errorMsg.classList.replace('d-none', 'd-block');
               errorMsg.innerHTML = "Email or Password is Incorrect";
          }
     }
     if (!found) {
          console.log('error');
     }
}
function signout() {
     console.log(currentUser)
     currentUser = null
     console.log("hellllo")
     localStorage.removeItem('currentUser');
     home.classList.replace('d-block', 'd-none')
     formSection.classList.replace('d-none', 'd-block')
     clear()
}
