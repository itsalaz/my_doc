// const saveLoginToLocalStorage = (login) => {
//   const loginData = {
//     username: login,
//     timestamp: new Date().getTime()
//   }
//   localStorage.setItem('login', JSON.stringify(loginData))
// }

// const loadLoginFromLocalStorage = () => {
//   const loginData = localStorage.getItem('login')
//   if (!loginData) {
//     return null
//   }

//   const { username, timestamp } = JSON.parse(loginData)
//   const oneHour = 60 * 60 * 1000
//   if (new Date().getTime() - timestamp > oneHour) {
//     localStorage.removeItem('login')
//     return null
//   }
//   return username
// }