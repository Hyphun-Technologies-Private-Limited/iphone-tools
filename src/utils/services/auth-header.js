export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.apikey) {
        return {
            'Authorization': user.apikey,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json' 
        };
    } else {
        return {};
    }
}