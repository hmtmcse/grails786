import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {
    Button, Card, CardActions, CardContent, CardHeader, Grid, TextField
} from "react-mui-ui/ui/ui-component";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";
import {TrFormDefinitionData} from "tm-react/src/artifacts/data/tr-form-definition-data";
import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import {AppConstant} from "../../system/app-constant";
import {ApiUtil} from "../../system/api-util";
import {TRMessageData} from "tm-react/src/artifacts/data/tr-message-data";
import {UserUrlMapping} from "./user-url-mapping";


interface Props extends TRProps {
    route: any;
}

class State extends TRComponentState{

}

class RegistrationView extends TRComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
        this.addFormDefinition("email", new TrFormDefinitionData({
            required: true,
            customValidation:{validate(fieldName: string, value: any, formData: { [p: string]: any }): TRMessageData {
                    if (!value){
                        return TRMessageData.failed("Please Enter Email Address")
                    }
                    let regex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
                    if (regex.test(value))
                    {
                        return TRMessageData.success("");
                    }
                    return TRMessageData.failed("You have entered an invalid email address!")
                }}
        }));
        this.addFormDefinition("firstName", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter First Name",

        }));
        this.addFormDefinition("password", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Password.",

        }));

    }

    componentDidMount() {
        this.showRedirectMessage();
        let redirectData = this.getRedirectData();
        if (redirectData && redirectData.isEdit){
            console.log("Edit")
        }
        console.log(redirectData)
    }



    onSubmit (event: any){
        event.preventDefault();
        const _this = this;
        if (this.validateFormInput()) {
            this.postJsonToApi(UserUrlMapping.API.CREATE, this.state.formData,
                {
                    callback(response: TRHTTResponse): void {
                        let apiResponse = ApiUtil.processApiResponse(response, _this);
                        if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS) {
                            _this.successRedirect(UserUrlMapping.ui.list, apiResponse.message);
                        }else{
                            ApiUtil.processApiResponseError(apiResponse, _this);
                        }
                    }
                },
                {
                    callback(response: TRHTTResponse): void {
                        ApiUtil.processApiErrorResponse(response, _this);
                    }
                }
            );
        }
    }

    renderUI() {
        const _this = this;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader title="Register User"/>
                    <form onSubmit={(event: any) => { this.onSubmit(event)}} noValidate>
                        <CardContent>
                            <Grid component="div" container spacing={3}>
                                <Grid item xs={6} component="div"><TextField {...this.handleInputDataChange("firstName")} label="First Name" margin="normal" fullWidth /></Grid>
                                <Grid item xs={6} component="div"><TextField {...this.handleInputDataChange("lastName")}  label="Last Name" margin="normal" fullWidth /></Grid>
                                <Grid item xs={6} component="div"><TextField {...this.handleInputDataChange("email")} type="email" label="Email Address" margin="normal" fullWidth /></Grid>
                                <Grid item xs={6} component="div"><TextField {...this.handleInputDataChange("password")} type="password" label="Password" margin="normal" fullWidth /></Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={1} component="div" justify="flex-end">
                                <Grid component="div" item xs={1}>
                                    <Button size="small" color="primary" type="submit" fullWidth variant="contained" children="save"/></Grid>
                                <Grid component="div" item xs={1}>
                                    <Button color="secondary" size="small" fullWidth variant="contained" children="Cancel" onClick={(event:any) => {TrUtil.gotoUrl(_this, UserUrlMapping.ui.list)}}/></Grid>
                            </Grid>
                        </CardActions>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default RegistrationView;