import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-e0bbe.firebaseio.com/'
});

export default instance;