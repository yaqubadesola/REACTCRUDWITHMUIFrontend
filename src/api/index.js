import axios from "axios";

export default axios.create({
    baseURL : 'http://localhost:3009/'
})
// to create default base URL