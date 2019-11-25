import TRLayoutInfoData from "tm-react/src/artifacts/data/view/tr-layout-info-data";
import React from "react";


const UserListView = React.lazy(() => import('./user-list-view'));
const UserRegistrationView = React.lazy(() => import('./registration-view'));
const ResetPasswordView = React.lazy(() => import('./reset-password-view'));
const UserDetailsView = React.lazy(() => import('./user-details-view'));
const ChangePasswordView = React.lazy(() => import('./change-password-view'));


export class UserUrlMapping {

    public static API = {
        LIST: "api/v1/user/list",
        CREATE: "api/v1/user/create",
        CHANGE_PASSWORD: "api/v1/user/change-password",
        RESET_PASSWORD: "api/v1/user/reset-password",
    };


    public static ui = {
        list: "/users",
        create: "/user/registration",
        details: "/user/details",
        resetPassword: "/user/reset-password",
        changePassword: "/user/change-password",
        profile: "",
    };

    public static privateUrlMappings(privateLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        privateLayoutInfo.addPageInstance(this.ui.list, UserListView);
        privateLayoutInfo.addPageInstance(this.ui.create, UserRegistrationView);
        privateLayoutInfo.addPageInstance(this.ui.details, UserDetailsView);
        privateLayoutInfo.addPageInstance(this.ui.resetPassword, ResetPasswordView);
        privateLayoutInfo.addPageInstance(this.ui.changePassword, ChangePasswordView);
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        return publicLayoutInfo;
    }
}