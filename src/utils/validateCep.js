import axios from 'axios';

export const importCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.data.erro) {
      return {
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      };
    }
  } catch (error) {
    console.error("Erro ao buscar dados do endereço:", error);
  }
  return null;
};