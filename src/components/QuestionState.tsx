import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

interface HistoryQuestion {
    type: "player" | "players" | "failed",
    player: string;
    text: string;
}

interface Props {
    history: HistoryQuestion[];
    progress: number;
    count: number;
}


class QuestionState extends Component<Props> {

    render()
    {
        const { progress, count, history } = this.props;

        const columns: any[] = [];

        history.map((event, i) => {
            if (event.type == "failed")
            {
                columns.push(<div className="col bg-danger text-center py-1" key={i}>
                    <h3>Failed</h3>
                </div>);
            } else if (event.type == "player") {
                columns.push(<div className="col bg-success text-center py-1" key={i}>
                    <h3>{ event.text }: { event.player }</h3>
                </div>);
            } else {
                columns.push(<div className="col bg-info text-center py-1" key={i}>
                    <h3>{ event.text }</h3>
                </div>);
            }
        });

        for (let i = progress +1; i <= count; i++) {
            columns.push(<div className="col bg-dark text-center py-1" key={-i}>
            </div>);
        }

        return <>
            <div className="row question-state">
                {columns}
            </div>
            <h2>{progress} / {count}</h2>
        </>;
    }
}

const mapStateToProps = (state: RootState): Props => {
    return {
        progress: state.dashboard.question_progress,
        count: state.dashboard.question_count,
        history: state.dashboard.history,
    }
}

export default connect(mapStateToProps)(QuestionState);