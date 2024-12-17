import axios from 'axios';

export async function searchImage(image, page, per_page) {
  const params = {
    key: '47659008-74bbb6b2c2d0fee0411ee57da',
    q: image.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  const response = await axios.get('https://pixabay.com/api/', { params });
  return response.data;
}
