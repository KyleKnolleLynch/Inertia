const axios = require('axios');

const API_URL = 'https://api.unsplash.com/photos/random';
 const API_CLIENT_ID = '';
  const URL = `${API_URL}?client_id=${API_CLIENT_ID}`;

exports.handler = async (event, context) => {
  return axios.get(URL)
          
          .then(res => ({
           statusCode: 200,
           headers: {
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Headers':
             'Origin, X-Requested-With, Content-Type, Accept'
           },
           body: JSON.stringify(res.data.location)
          }))
          .catch(error => ({ statusCode: 422, body: String(error) }));
  
 
    
 

  // Perform API call
  // const getPhotos = () => {

  // }

}