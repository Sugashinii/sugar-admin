export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true"
}

export function logout() {
  localStorage.removeItem("isLoggedIn")
}
