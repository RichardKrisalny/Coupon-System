import axios from "axios";
import { AuthStore } from "../Redux/AuthState";

class Interceptors{
    public create():void{
        axios.interceptors.request.use(requestObject => {
                if(AuthStore.getState().token){
                    requestObject.headers.Authorization = "Bearer " + AuthStore.getState().token;
                }
            return requestObject;
        });
    }

}
const interceptor = new Interceptors();
export default interceptor;