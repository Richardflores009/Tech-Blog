async function loginAccount(event) {
  event.preventDefault();

  const userEl = document.querySelector("#username-input-login");
  const passEl = document.querySelector("#password-input-login");
  fetch("/api/user/login", {
    method: "post",
    body: JSON.stringify({
      username: userEl.value,
      password: passEl.value
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(function() {
      document.location.replace("/dashboard");
    })
    .catch(err => console.log(err));
};

document.querySelector("#login-form").addEventListener("submit", loginAccount);
