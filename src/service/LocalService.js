import api from "./api";
import AuthService from "./AuthService";

const LocalService = {
  findAllLocais: (filters) => {
    const params = new URLSearchParams();
    if (filters) {
      for (const key in filters) {
        const value = filters[key];
        params.append(key, value);
      }
    }

    return api.get(AuthService.host() + "/local", { params: params });
  },

  createLocal: (body) => {
    return api.post(AuthService.host() + "/local", body);
  },

  updateLocal: (id, body) => {
    return api.put(AuthService.host() + `/local/${id}`, body);
  },

  deleteLocal: (id) => {
    return api.delete(AuthService.host() + `/local/${id}`);
  }
};

export default LocalService;
