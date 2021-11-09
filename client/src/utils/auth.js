import decode from 'jwt-decode';

class AuthService {
  getToken() {
    return localStorage.getItem('id_token');
  };

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      }
      return false;
    }
    catch(error) {
      localStorage.removeItem('id_token');
      return true;
    }
  };

  getProfile()  {
    const token = this.getToken()
    if(token != null) {
      if(!this.isTokenExpired(token)) {
        return decode(this.getToken());
      }
    }
  };

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  };

  login(idToken) {
    localStorage.setItem('id_token', idToken);
  };

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/splash');
  };
};

export default new AuthService();
