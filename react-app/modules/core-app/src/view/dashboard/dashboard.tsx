import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";


interface Props extends TRProps {
    route: any;
}

class Dashboard extends TRComponent<Props, TRComponentState> {

    state: TRComponentState = new TRComponentState();
    componentDidMount() {}

    renderUI() {
        const {route} = this.props;
        return (
            <React.Fragment> Dashboard </React.Fragment>);
    }
}

export default Dashboard;