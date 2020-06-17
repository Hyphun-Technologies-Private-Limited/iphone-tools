const storage = require('electron-json-storage');
export default function getApi() {
    storage.get('apikey', function (err, data) {
        if (data == '') {
           
        }
    });
}

