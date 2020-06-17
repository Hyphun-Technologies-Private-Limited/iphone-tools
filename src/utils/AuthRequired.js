const storage = require('electron-json-storage');
export default (to, from, next) => {
  var apikey = '';
  storage.get('apikey', (err, data) => {
    apikey = data;
  })
  //var apikey = localStorage.getItem('user')
  if (apikey != null && apikey != '') {
    next()
  } else {
    next('/settings')
  }
}


