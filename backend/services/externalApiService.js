const axios = require('axios');

exports.getCatImage = async () => {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    return response.data[0].url;
};
