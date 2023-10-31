import axios from 'axios';

export async function service(query, page = 1, perPage = 40) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40319366-fb3726f62eb8b3ab77607e139';
  // https://pixabay.com/api/?key=40319366-fb3726f62eb8b3ab77607e139&q=&image_type=photo&orientation=horizontal&safesearch=true&page=1
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
