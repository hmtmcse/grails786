import React from 'react';
import TRLayoutInfoData from "tm-react/src/artifacts/data/view/tr-layout-info-data";
import TRURLMapping from "tm-react/src/artifacts/config/tr-url-mapping";
import PublicLayout from "../view/layouts/public-layout";
import PrivateLayout from "../view/layouts/private-layout";



const LoginView = React.lazy(() => import('../view/authentication/login-view'));
const ForgotPasswordView = React.lazy(() => import('../view/authentication/forgot-password-view'));
const Dashboard = React.lazy(() => import('../view/dashboard/dashboard'));
const Component = React.lazy(() => import('react-mui-ui/ui/tr-ui-demo'));
const UserListView = React.lazy(() => import('../view/user/user-list-view'));

const UserRegistrationView = React.lazy(() => import('../view/user/registration-view'));
const ResetPasswordView = React.lazy(() => import('../view/user/reset-password-view'));
const UserDetailsView = React.lazy(() => import('../view/user/user-details-view'));
const ChangePasswordView = React.lazy(() => import('../view/user/change-password-view'));

export default class URLMapping extends TRURLMapping {

    public getLayoutsAndPages(): Array<TRLayoutInfoData> {
        let pageWithLayout: Array<TRLayoutInfoData> = [];

        let publicLayoutInfo: TRLayoutInfoData = new TRLayoutInfoData();
        publicLayoutInfo.layout = PublicLayout;
        publicLayoutInfo.addPageInstance("/", LoginView);
        publicLayoutInfo.addPageInstance("/forgot-password", ForgotPasswordView);
        publicLayoutInfo.addPageInstance("/component", Component);
        pageWithLayout.push(publicLayoutInfo);


        publicLayoutInfo = new TRLayoutInfoData();
        publicLayoutInfo.layout = PrivateLayout;
        publicLayoutInfo.addPageInstance("/dashboard", Dashboard);


        publicLayoutInfo.addPageInstance("/user", UserListView);
        publicLayoutInfo.addPageInstance("/user/registration", UserRegistrationView);
        publicLayoutInfo.addPageInstance("/user/details", UserDetailsView);
        publicLayoutInfo.addPageInstance("/user/reset-password", ResetPasswordView);
        publicLayoutInfo.addPageInstance("/user/change-password", ChangePasswordView);
        pageWithLayout.push(publicLayoutInfo);


        return pageWithLayout
    }

}