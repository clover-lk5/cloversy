const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const loginAlert = document.getElementById("loginAlert");
const signupAlert = document.getElementById("signupAlert");

showSignup.addEventListener("click", () => {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  loginAlert.textContent = "";
});

showLogin.addEventListener("click", () => {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  signupAlert.textContent = "";
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email === "user@example.com" && password === "password123") {
    loginAlert.style.color = "green";
    loginAlert.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } else {
    loginAlert.style.color = "red";
    loginAlert.textContent = "Incorrect email or password.";
  }
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (name && email && password.length >= 6) {
    signupAlert.style.color = "green";
    signupAlert.textContent = "Account created successfully!";
    setTimeout(() => {
      signupForm.reset();
      showLogin.click();
    }, 1500);
  } else {
    signupAlert.style.color = "red";
    signupAlert.textContent = "Fill all fields correctly. Password must be 6+ chars.";
  }
});