import React from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { PlayerStatisticsStatus, CumulativeHistory } from "../actionTypes/dashboardActionTypes";

import { createColorMap, linearScale } from "@colormap/core";
import { CIVIDIS } from "@colormap/presets";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

import { Logo } from './Logo';

interface Props {
    stats: PlayerStatisticsStatus[];
    cumhist: CumulativeHistory[];
}

class GameOver extends React.Component<Props>
{
    render()
    {
        const statsdata: Array<{name: string, points: number}> = [];

        this.props.stats.forEach((stat) => {
            statsdata.push({
                name: stat.display_name,
                points: stat.points,
            })
        })

        let scale = linearScale([0, this.props.stats.length + 1], [0.3, 1]);
        let colorMap = createColorMap(CIVIDIS, scale);

        const [r, g, b] = colorMap(0);
        const fill = `rgb(${r * 255},${g * 255},${b * 255})`

        return <>
            <div className="col">
                <div className="row justify-content-center">
                    <Logo />
                    <div className="col-12 text-center my-5">
                        <h1>Game over!</h1>
                    </div>
                    <div className="col-6">
                        <h3 className="text-center text-muted">Points:</h3>
                        <ResponsiveContainer width={"100%"} height={600}>
                            <BarChart data={statsdata}>
                                <XAxis dataKey="name" stroke="#fff"/>
                                <YAxis stroke="#fff"/>
                                <Bar dataKey='points' fill={fill} maxBarSize={80}/>
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-6">
                        <h3 className="text-center text-muted">Progress:</h3>
                        <ResponsiveContainer width={"100%"} height={600}>
                            <LineChart data={this.props.cumhist}>
                                <XAxis dataKey="index" stroke="#999"/>
                                <YAxis stroke="#999" orientation="right" />
                                { this.props.stats.map((stats, index) => {
                                    const [r, g, b] = colorMap(index + 1);

                                    const stroke = `rgb(${r * 255},${g * 255},${b * 255})`

                                    return <Line
                                        type="monotone"
                                        dataKey={stats.display_name}
                                        stroke={stroke} key={stats.id}
                                        strokeWidth={3}/>
                                })}
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    }
}

const mapStateToProps = (state: RootState): Props => {
    if (!state.dashboard.gameover)
    {
        throw new Error("No gameover state found!");
    }

    return {
        stats: state.dashboard.gameover.stats,
        cumhist: state.dashboard.gameover.cumhist,
    }
}

export default connect(mapStateToProps)(GameOver)