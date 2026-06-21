export function getCurrentUser() {
  return localStorage.getItem('currentUser')
}

export function isLoggedIn() {
  return !!localStorage.getItem('currentUser')
}

export function logout() {
  localStorage.removeItem('currentUser')
}