import axios from "axios";

const AuthService = {
  usuarioCorrente: () => {
    let conteudo = localStorage.getItem("usuario");
    if (conteudo) {
      return JSON.parse(conteudo);
    } else {
      return null;
    }
  },

  setUsuarioCorrente: (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  },

  removeUsuarioCorrente: () => {
    localStorage.removeItem("usuario");
  },

  token: () => {
    let corrente = this.usuarioCorrente();
    if (corrente) {
      return corrente.token;
    } else {
      return null;
    }
  },

  auth: (credenciais) => {
    return axios.post(
      process.env.REACT_APP_HOST_API + "/auth/login",
      credenciais
    );
  },

  register: (user) => {
    return axios.post(
      process.env.REACT_APP_HOST_API + "/auth/signup",
      user
    );
  },

  host: () => {
    return process.env.REACT_APP_HOST_API;
  },
};

export default AuthService;
