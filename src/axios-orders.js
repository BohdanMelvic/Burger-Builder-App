import axios from 'axios';

const DBinstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://burger-builder-app-4682e.firebaseio.com/'
});

export default DBinstance;