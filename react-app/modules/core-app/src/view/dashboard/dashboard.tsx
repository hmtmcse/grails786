import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import {Grid, Paper} from "react-mui-ui/ui/ui-component";
import {classes} from "istanbul-lib-coverage";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid, Cell,
    Label,
    Legend,
    Line,
    LineChart, Pie, PieChart, RadialBar, RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";


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

        const barChart = [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
        ];

        const {route} = this.props;

        const data = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];

        const style = {
            top: 0,
            left: 350,
            lineHeight: '24px',
        };


        const xyz = [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
        ];

        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={6}>
                        <LineChart width={800} height={300} data={[
                            {name: 'Page A', uv: 400, pv: 2400, amt: 1111},
                            {name: 'Page B', uv: 150, pv: 1500, amt: 2400},
                            {name: 'Page C', uv: 100, pv: 4562, amt: 115},
                            ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={6}>
                        <BarChart
                            width={600}
                            height={300}
                            data={barChart}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </Grid>
                    <Grid item xs={12} md={4} lg={6}>
                        <AreaChart
                            width={800}
                            height={400}
                            data={xyz}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </Grid>
                </Grid>
            </React.Fragment>);
    }
}

export default Dashboard;