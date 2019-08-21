const axios = require('axios');

exports.handler = function(event, context, callback) {
  let today = new Date();
  let hours = today.getHours();
  let query;

  // hours < 4
  //   ? (query = '&query=nature+night')
  //   : hours < 12
  //   ? (query = '&query=nature+morning')
  //   : hours < 18
  //   ? (query = '&query=nature+afternoon')
  //   : hours < 24
  //   ? (query = '&query=nature+night')
  //   : (query = '&query=nature');

  if (hours < 4) {
    query = '&query=nature+night';
  } else if (hours < 12) {
    query = '&query=nature+morning';
  } else if (hours < 18) {
    query = '&query=nature+afternoon';
  } else if (hours < 24) {
    query = '&query=nature+night';
  }

  const { UNSPLASH_CLIENT_ID } = process.env;
  const BASE_URL = 'https://api.unsplash.com/photos/random';
  const API_URL = `${BASE_URL}?client_id=${UNSPLASH_CLIENT_ID}${query}`;

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
