import axios from 'axios';

export async function service() {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40319366-fb3726f62eb8b3ab77607e139';

  const params = new URLSearchParams({
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
