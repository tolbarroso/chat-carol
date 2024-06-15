const axios = require('axios');

exports.getCatImage = async () => {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    return response.data[0].url;
};

exports.getAddressByCep = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};
