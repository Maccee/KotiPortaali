import jwtDecode from 'https://cdn.skypack.dev/jwt-decode';

function displayUserInfo() {
    const token = localStorage.getItem('token');
    const logoutElem = document.getElementById('logout');
    const userInfoElem = document.getElementById('userInfo');
    const loginButtonElem = document.querySelector('.login-button');
    
    if (token) {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;
        if (username) {
            userInfoElem.style.display = 'block';
            userInfoElem.textContent = `Kirjautunut: ${username}`;
            logoutElem.style.display = 'block';
            logoutElem.querySelector('a').textContent = 'Kirjaudu ulos';
            loginButtonElem.style.display = 'none';
        }
    } else {
        logoutElem.querySelector('a').textContent = '';
        logoutElem.style.display = 'none';
        userInfoElem.textContent = '';
        userInfoElem.style.display = 'none';
        loginButtonElem.style.display = 'block';
    }
}


function isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin && decodedToken.isAdmin === "True";
}
function logout() {
    localStorage.removeItem('token');
    loadContent('./modules/login.html');
    
    
    displayUserInfo(); 
}

window.logout = logout;
window.isAdmin = isAdmin;
window.displayUserInfo = displayUserInfo;