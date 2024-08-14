const passwordBox = document.getElementById('password');
const length = 12
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

function generatePassword() {
    let password = "";
    let characters = uppercase + lowercase + numbers + symbols;
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    passwordBox.value = password;
}

function copyPassword() {
    passwordBox.focus();
    passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value)
        .then(() => {
            alert('Password copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

copyButton.addEventListener('click', copyPassword);