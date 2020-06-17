import axios from "axios";
import app from "@/main"; // import the instance
import {apiUrl} from "@/constants/config";
const instance = axios.create({
    baseURL: apiUrl,
});
//instance.defaults.headers.common['Content-type'] = 'application/json';
// instance.defaults.headers.common = {};
// instance.defaults.headers.common.accept = 'application/json';

instance.interceptors.request.use(config => {
    if (config.method == "post") {
        config.headers.post = [];
        config.headers.post['Content-Type'] = 'application/json';
    }
    app.$Progress.start(); // for every request start the progress
    return config;
});


instance.interceptors.response.use(response => {
    app.$Progress.finish(); // finish when a response is received
    return response;
});


export default instance;
