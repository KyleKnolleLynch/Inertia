const axios = require('axios');

exports.handler = function(event, context, callback) {
  let today = new Date();
  let hours = today.getHours();
  let query;

  hours < 4
    ? (query = '&query=nature&query=night')
    : hours < 12
    ? (query = '&query=nature&query=morning')
    : hours < 18
    ? (query = '&query=nature&query=afternoon')
    : hours < 24
    ? (query = '&query=nature&query=night')
    : (query = '&query=nature');

  const { UNSPLASH_CLIENT_ID } = process.env;
  const API_URL = `https://api.unsplash.com/photos/random${query}?client_id=${UNSPLASH_CLIENT_ID}`;

  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body)
    });
  };

  const getPhotos = () => {
    axios
      .get(API_URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  };

  if (event.httpMethod == 'GET') {
    getPhotos();
  }
};
