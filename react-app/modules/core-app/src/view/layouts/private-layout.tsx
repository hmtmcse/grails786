import React from 'react';
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import TRLayoutRenderer from "tm-react/src/artifacts/component/tr-layout-rander";
import {withStyles} from "react-mui-ui/ui/ui-component";
import NavAppBar from "react-mui-ui/snippet/nav-app-bar";
import {privateLayoutJSS} from "../../assets/style-jss";
import {AppConstant} from "../../system/app-constant";
import AppNavigation from "../../system/app-navigation";

class PrivateLayout extends TRReactComponent<any, any> {

    render() {
        const {component, route, appConfig, classes} = this.props;

        let renderView = (
            <NavAppBar
                itemList={AppNavigation.getNavigation(route)}
                appTitle={AppConstant.appName}
                bodyContent={<TRLayoutRenderer route={route} appConfig={appConfig} component={component}/>}/>
            );

        return (
            <React.Fragment>
                {renderView}
            </React.Fragment>
        );
    }

}

export default withStyles(privateLayoutJSS)(PrivateLayout);