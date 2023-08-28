

// login button ja login text
document.addEventListener("DOMContentLoaded", function() {
    let username = getCookie("username");
    
    let loginStatus = document.querySelector(".login-status");
    let loginButton = document.querySelector(".login-button");
    let usernameText = document.querySelector(".username-text");
  
    if (username) {
        usernameText.textContent = "Logged in as " + username;
        
        // Show user status and hide login button
        loginStatus.classList.remove('hidden');
        loginButton.classList.add('hidden');
    } else {
        // Hide user status and show login button
        loginStatus.classList.add('hidden');
        loginButton.classList.remove('hidden');
    }
  });
