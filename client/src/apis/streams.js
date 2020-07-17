// transfers this code to ../actions/index.js
// isn't it great that axios literally makes this json-server just by using the create command? Why is it 3001? Because... just 3000 and 1. 
import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:3001'
});

