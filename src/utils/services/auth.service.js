import axios from "@/utils/axios-api";
class AuthService {
    login(user) {
        return axios
            .post('/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.data.user.id) {
                    const item = {
                        uid: response.data.data.user.id,
                        title: response.data.data.user.name,
                        email: response.data.data.user.email,
                        apikey: response.data.data.user.apikey
                    };
                    localStorage.setItem('user', JSON.stringify(item))
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();