//creating the user element
let username = document.getElementById('username');
let password = document.getElementById("password");
let email=document.getElementById("email")
let usernameError = document.getElementById('usernameError');
let passwordError = document.getElementById('passwordError');
let emailEroor=document.getElementById("emailerror")
//validation
function showError(element, message) {
    element.innerHTML = `${message} is invalid`;
    element.style.color = "red";
}

document.forms[0].onsubmit = function(e) {
    //variables
    let userValid = false;
    let passValid = false;
    let emailValid=false;
    //regulare expression
    let emailreg=/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
    let passRe = /[A-Za-z]/;
    // validation condition
    if(email.value.match(emailreg)){emailValid=true}
    if (username.value.trim() !== "" && username.value.trim().length < 10 && username.value.trim().length > 4) {userValid = true}
    if (password.value.match(passRe)) {passValid = true;}
    // display errors
    if (!emailValid) {
        showError(emailEroor, "Email");
        e.preventDefault();
    } else {
        passwordError.innerHTML = ""; // Clear the error message if correct
    }
    if (!userValid) {
        showError(usernameError, "Username");
        e.preventDefault();
    } else {
        usernameError.innerHTML = ""; // Clear the error message if correct
    }
    if (!passValid) {
        showError(passwordError, "Password");
        e.preventDefault();
    } else {
        passwordError.innerHTML = ""; // Clear the error message if correct
    }
}



