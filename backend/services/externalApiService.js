const axios = require('axios');

exports.getCatImage = async () => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        return response.data[0].url;
    } catch (error) {
        throw new Error('Failed to fetch cat image');
    }
};

exports.getDogImage = async () => {
    try {
        const response = await axios.get('https://random.dog/dbf26105-55ca-41a0-8624-9883be60f692.mp4');
        return response.data[0].url;
    } catch (error) {
        throw new Error('Failed to fetch dog image');
    }
};

exports.getCepInfo = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch CEP info');
    }
};

exports.getAddressInfo = async (street, city) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${city}/${street}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch address info');
    }
};
