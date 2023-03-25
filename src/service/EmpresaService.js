import api from "./api";
import AuthService from "./AuthService";

const EmpresaService = {
  findAllEmpresas: (filters) => {
    const params = new URLSearchParams();
    if (filters) {
      for (const key in filters) {
        const value = filters[key];
        params.append(key, value);
      }
    }

    return api.get(AuthService.host() + "/empresa", { params: params });
  },

  createEmpresa: (body) => {
    return api.post(AuthService.host() + "/empresa", body);
  },

  updateEmpresa: (id, body) => {
    return api.patch(AuthService.host() + `/empresa/${id}`, body);
  },

  deleteEmpresa: (id) => {
    return api.delete(AuthService.host() + `/empresa/${id}`);
  }
};

export default EmpresaService;
