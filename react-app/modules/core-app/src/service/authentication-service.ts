import TRBrowserStorageManager from "tm-react/src/artifacts/manager/tr-browser-storage-manager";
import TRHTTRequest from "tm-react/src/artifacts/processor/http/tr-http-request";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";

export default class AuthenticationService {

    public processLoginToken(data: any) {
        TRBrowserStorageManager.add("isAuthorized", true);
        TRBrowserStorageManager.add("token", data.token)
    }

    public processAuth(request: TRHTTRequest): TRHTTRequest {
        let token = TRBrowserStorageManager.getByKey("token");
        request.headers = TrUtil.addDataToObject(request.headers, "Authorization", "Bearer " + token);
        return request;
    }


    public static instance() {
        return new AuthenticationService();
    }
}