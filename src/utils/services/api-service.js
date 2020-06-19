import axios from "@/utils/axios-api";
import authHeader from '@/utils/services/auth-header';
class ApiService {
    fetchOrders(per_page, curPage, status,apikey) {
        return axios.get('http://www.iphonetools.io/api/get-records/?api_key=' + apikey+'&type=orders&per_page=' + per_page + '&page=' + curPage+'&status='+status, { headers: authHeader() });
    }
    fetchServices(categoryid, apikey) {
        var url = 'http://www.iphonetools.io/api/get-services/?api_key=' + apikey +'&show_custom&app_services';
        if (categoryid != null) {
            url = 'http://www.iphonetools.io/api/get-services/?api_key=' + apikey +'&show_custom&app_services&category_id='+categoryid;
        }
        return axios.get(url, { headers: authHeader() });
    }
    fetchCategories() {
        return axios.get('http://www.iphonetools.io/api/categories', { headers: authHeader() });
    }
    fetchTopups(per_page, curPage, status,apikey) {
        if (status == 18) {
            return axios.get('http://www.iphonetools.io/api/get-records/?api_key=' + apikey +'&type=funds&per_page=' + per_page + '&page=' + curPage + '&status=' + status, { headers: authHeader() });
        } else {
            return axios.get('http://www.iphonetools.io/api/get-records/?api_key=' + apikey +'&type=funds&per_page=' + per_page + '&page=' + curPage + '&status=' + status, { headers: authHeader() });
        }
    }
    fetchTransactions(per_page, curPage, status,apikey) {
        if (status == 15) {
            return axios.get('http://www.iphonetools.io/api/get-records/?api_key=' + apikey +'&type=transactions&per_page=' + per_page + '&page=' + curPage + '&status=' + status, { headers: authHeader() });
        } else {
            return axios.get('http://www.iphonetools.io/api/get-records/?api_key=' + apikey +'&type=transactions&per_page=' + per_page + '&page=' + curPage, { headers: authHeader() });
        }
    }
    fetchDashboardStats(apikey) {
        return axios.get('http://www.iphonetools.io/api/get-stats/?api_key=' + apikey, { headers: authHeader() });
    }
    placeOrder(imeis, serviceid,deviceid,apikey) {
        var imeistring = '';
        var i = 0;
        imeis.map(function (resp) {
            if (i > 0) {
                imeistring = imeistring + ',' + resp;
            } else {
                imeistring = resp;
            }
            i++;
        });
        //TODO make api key dynamic
        var postobj = {api_key:apikey, service: serviceid, imei: imeistring, new_flow: '', device_id: deviceid }
        var url = 'http://www.iphonetools.io/api/place-bulk-order';
        return axios.post(url, JSON.stringify(postobj), { headers: authHeader()});
    }
    checkApikey(apikey) {
        return axios.get('http://www.iphonetools.io/api/get-stats/?api_key=' + apikey, { headers: authHeader() });
    }
    fetchSettings() {
        return axios.get('/settings', { headers: authHeader() });
    }
    updateSettings(payload) {
        return axios.post('/settings',payload,{ headers: authHeader() });
    }
    getRequest(url) {
        return axios.get(url,{ headers: authHeader() });
    }
    postRequest(url,payload) {
        return axios.post(url, payload, { headers: authHeader() });
    }
    

}
export default new ApiService();