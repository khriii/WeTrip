const handleRegisterBtnClick = (username, password) => {
    fetch('http://localhost/api-registerUser.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => { console.error(error) })
}

document.addEventListener("DOMContentLoaded", () => {

    // Get all the required DOM elements
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const registerBtn = document.getElementById("registerBtn");

    if (usernameInput && passwordInput && registerBtn) {
        registerBtn.addEventListener('click', () => {
            handleRegisterBtnClick(usernameInput.value, passwordInput.value);
        });
    } else {
        console.error(`loginBtn/usernameInput/passwordInput not found`);
    }



});