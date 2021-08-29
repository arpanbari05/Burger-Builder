import Axios from 'axios';

const instance = Axios.create({
    baseURL: "https://burger-builder-82c22-default-rtdb.firebaseio.com/"
});

export default instance;