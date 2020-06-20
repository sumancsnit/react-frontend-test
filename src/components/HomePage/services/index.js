import axios from 'axios';

const RESOURCE = 'https://www.omdbapi.com/';

//https://www.omdbapi.com/?s=action&y=2010&apikey=96aeca02

const fetchMoviesData = async (cancelToken, title, year, apikey) => {
  const response = await axios.get(RESOURCE, {
    params: {
      cancelToken,
      s: title,
      y: year,
      apikey,
    },
  });
  if (response.status === 200) return response.data;

  throw Error(response.message);
};

const fetchFullData = async (cancelToken, id, apikey) => {
  const response = await axios.get(RESOURCE, {
    params: {
      cancelToken,
      i: id,
      plot: 'full',
      apikey,
    },
  });
  if (response.status === 200) return response.data.data;

  throw Error(response.message);
};

//www.omdbapi.com/?i=tt1639323&plot=full&apikey=96aeca02

export { fetchMoviesData, fetchFullData };
