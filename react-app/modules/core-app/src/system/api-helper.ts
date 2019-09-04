import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import {object, string} from "prop-types";


export default class APIHelper {

    public static requestDataMaker(map: any) {
        return {data: map}
    }

    public static processSuccessResponse(response: TRHTTResponse, component: any) {
        console.log(response);
        if (!response.isSuccess || !response.responseData) {
            let message = "Unable to communicate with remote server";
            if (response.responseData.message){
                message = response.responseData.message;
            }
            component.showErrorFlash(message);
        } else {
            return response.responseData;
        }
    }

    public static processErrorResponse(response: TRHTTResponse, component: any) {
        if (!response.isSuccess && response.message) {
            component.showErrorFlash(response.message);
        } else {
            let message = "Unable to communicate with remote server";
            if (response.responseData.message){
                let data = response.responseData.message;
                if (typeof data === 'string' || data instanceof String){
                    message = response.responseData.message;
                }
            }
            component.showErrorFlash(message);
        }
    }

}