import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import {ApiUrl} from "../../system/api-url";
import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import APIHelper from "../../system/api-helper";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
    withStyles
} from "react-mui-ui/ui/ui-component";
import {viewCommon} from "../../assets/style-jss";
import TRTableHeader, {SortDirection} from "react-mui-ui/ui/tr-table-header";
import {Align, TRTableActionDataHelper, TRTableHeaderDataHelper} from "react-mui-ui/ui/tr-ui-data";
import TRTableAction from "react-mui-ui/ui/tr-table-action";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";


interface Props extends TRProps {
    route: any;
    classes: any;
}

const tableHeaderDefinition = TRTableHeaderDataHelper.init("Email", "email", true, "", Align.left);
tableHeaderDefinition.add( "Username", "username", true, "", Align.left);



class UserListViewState extends TRComponentState {
    apiData: any;
    list: any = [];
}

class UserListView extends TRComponent<Props, UserListViewState> {

    state: UserListViewState = new UserListViewState();

    componentDidMount() {
        this.showRedirectMessage();
        this.loadData();
    }

    public loadData(){
        const _this = this;
        this.getToApi(ApiUrl.USER_LIST,
            {
                callback(response: TRHTTResponse): void {
                    let apiResponse = APIHelper.processSuccessResponse(response, _this);
                    let list = [];
                    if (apiResponse.data.users){
                        list = apiResponse.data.users;
                    }
                    _this.setState({
                        list: list,
                        apiData: apiResponse
                    });
                    console.log(apiResponse);
                }
            },
            {
                callback(response: TRHTTResponse): void {
                    APIHelper.processErrorResponse(response, _this);
                }
            }
        );
    }

    renderUI() {
        const {route, classes} = this.props;
        const component = this;
        const _this = this;
        let tableAction: TRTableActionDataHelper = TRTableActionDataHelper.start("Details", "");
        tableAction.addAction("Reset Password")
        tableAction.addAction("Change Password").setAction({click(event: any, onClickData: any): void {
            console.log("Reset");
               _this.redirect("/user/change-password")
            }});



        return (
            <React.Fragment>
                <Paper className={classes.mainActionArea}>
                    <div>
                        <Typography variant="h5">Users</Typography>
                    </div>
                    <div>
                        <form className={classes.displayInline}>
                            <TextField placeholder="search" name="search"/>
                        </form>
                        <Button className={classes.marginToLeft}  variant="contained" color="primary" onClick={(event:any) => {TrUtil.gotoUrl(_this, "/user/registration")}}>Create</Button>
                        <Button className={classes.marginToLeft}  variant="contained" color="primary" onClick={(event:any) => {this.loadData()}} >Reload</Button>
                    </div>
                </Paper>
                <Paper>
                    <Table>
                        <TRTableHeader
                            clickForSortFunction={
                                {
                                    click(event: any, onClickData: any): void {
                                        console.log("Clicked");
                                        if (component.state.sortDirection === SortDirection.ascending){
                                            component.setState({
                                                sortDirection: SortDirection.descending
                                            })
                                        } else{
                                            component.setState({
                                                sortDirection: SortDirection.ascending
                                            })
                                        }

                                    }
                                }
                            }
                            actionColumnAlign={Align.right}
                            headers={tableHeaderDefinition.getHeaders()}
                            orderBy={this.state.orderBy}
                            sortDirection={this.state.sortDirection}/>
                        <TableBody>
                            {this.state.list.map((row: any, index:any) => (
                                <TableRow key={index} >
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.username}</TableCell>
                                    <TableCell align="right">
                                        <TRTableAction actions={tableAction.getMap()}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>);
    }
}

export default withStyles(viewCommon)(UserListView);