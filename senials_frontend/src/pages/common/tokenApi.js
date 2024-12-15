// import axios from "axios";

// const token = localStorage.getItem("token");

// const api = axios.create({
//     /* API 기본 URL - proxy 설정 없애면 baseURL 활성화 */
//     // baseURL: 'http://localhost:8080', 
//     headers: {
//         'Authorization': token
//     }
// })

// export default api;

import axios from 'axios'; 

const createApiInstance = () => {

    const token = localStorage.getItem("token"); 

    return axios.create({ 
        /* API 기본 URL - proxy 설정 없애면 baseURL 활성화 */ 
        // baseURL: 'http://localhost:8080', 
        headers: { 
            'Authorization': token
        } 
    }); 
}; 

export default createApiInstance;
