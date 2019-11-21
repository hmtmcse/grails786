import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import {Grid, Paper} from "react-mui-ui/ui/ui-component";
import {classes} from "istanbul-lib-coverage";
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";


interface Props extends TRProps {
    route: any;
}

const data = [
     ['00:00', 0],
     ['03:00', 300],
     ['06:00', 600],
     ['09:00', 800],
     ['12:00', 1500],
     ['15:00', 2000],
     ['18:00', 2400],
     ['21:00', 2400],
     ['24:00', undefined],
];


class Dashboard extends TRComponent<Props, TRComponentState> {

    state: TRComponentState = new TRComponentState();
    componentDidMount() {}




    renderUI() {
        let lineChart = [
            {'00:00': 0},
            {'03:00': 300},
            {'06:00': 600},
            {'09:00': 800},
        ];

        const {route} = this.props;
        return (
            <React.Fragment>
                Dashboard
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper>
                            <ResponsiveContainer>
                                <LineChart
                                    data={lineChart}
                                    margin={{
                                        top: 16,
                                        right: 16,
                                        bottom: 0,
                                        left: 24,
                                    }}
                                >
                                    <XAxis dataKey="time" />
                                    <YAxis>
                                        <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                                            Sales ($)
                                        </Label>
                                    </YAxis>
                                    <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            {/*<Deposits />*/}
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper >
                            {/*<Orders />*/}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>);
    }
}

export default Dashboard;