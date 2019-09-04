import React from 'react';
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProgress} from "react-mui-ui/ui/tr-progress";




export default class AppSuspenseLoader extends TRReactComponent<any, any> {

    render() {
        return "Please Wait....."
    }

}