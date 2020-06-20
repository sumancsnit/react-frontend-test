import axios from 'axios';

const RESOURCE = 'https://www.omdbapi.com/';

const KEY = '3ba48acf';

//https://www.omdbapi.com/?s=action&y=2010&apikey=96aeca02

const fetchMoviesData = async (cancelToken, title, year) => {
  const response = await axios.get(RESOURCE, {
    params: {
      cancelToken,
      s: title,
      y: year,
      apikey: KEY,
    },
  });
  if (response.status === 200) return response.data;

  throw Error(response.message);
};

const fetchFullData = async (cancelToken, id) => {
  const response = await axios.get(RESOURCE, {
    params: {
      cancelToken,
      i: id,
      plot: 'full',
      apikey: KEY,
    },
  });
  console.log('fetchFullData -> response', response);
  if (response.status === 200) return response.data;

  throw Error(response.message);
};

export { fetchMoviesData, fetchFullData };
