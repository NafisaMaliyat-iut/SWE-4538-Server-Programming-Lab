function validatePassword() {
  const password = document.getElementById("password");
  const error_message = document.getElementById("error_mesage");
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    // Password format is invalid
    error_message.innerHTML = "Password too weak!";
    error_message.style.color = "red";
  }
}
