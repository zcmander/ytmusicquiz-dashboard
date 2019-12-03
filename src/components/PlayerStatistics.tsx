import React from "react";
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { PlayerStatisticsStatus } from "../actionTypes/dashboardActionTypes";


interface Props {
    stats: PlayerStatisticsStatus[]
}

class PlayerStatistic extends React.Component<Props>
{
    render()
    {
        return <div className="row player-statistics">
            { this.props.stats.map(stat => {
                return <div className="col text-center bg-light" key={stat.id}>
                    <h3>{ stat.display_name }: { stat.points }</h3>
                </div>;
            })}
        </div>
    }
}

const mapStateToProps = (state: RootState): Props => {
    if (!state.dashboard.question)
    {
        throw new Error("No question found!");
    }

    return {
        stats: state.dashboard.question.stats,
    }
}

export default connect(mapStateToProps)(PlayerStatistic);