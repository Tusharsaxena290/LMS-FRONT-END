import axios from "axios";


const Base_URL="http://localhost:5014/api/v1";
const axisInstance=axios.create();
axisInstance.defaults.baseURL=Base_URL;
axisInstance.defaults.withCredentials=true;


export default axisInstance;