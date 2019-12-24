import axios from 'axios';

const DBinstance = axios.create({
    baseURL: 'https://burger-builder-app-4682e.firebaseio.com/'
});

export default DBinstance;