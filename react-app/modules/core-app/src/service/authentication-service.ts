import TRBrowserStorageManager from "tm-react/src/artifacts/manager/tr-browser-storage-manager";
import TRHTTRequest from "tm-react/src/artifacts/processor/http/tr-http-request";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";

export default class AuthenticationService {

    public processLoginToken(data: any) {
        TRBrowserStorageManager.add("isAuthorized", true);
        let accessData = data.login;
        TRBrowserStorageManager.add("accessToken", accessData.accessToken);
        TRBrowserStorageManager.add("refreshToken", accessData.refreshToken)
    }

    public processAuth(request: TRHTTRequest): TRHTTRequest {
        let accessToken = TRBrowserStorageManager.getByKey("accessToken");
        request.headers = TrUtil.addDataToObject(request.headers, "Authorization", "Bearer " + accessToken);
        return request;
    }


    public static instance() {
        return new AuthenticationService();
    }
}