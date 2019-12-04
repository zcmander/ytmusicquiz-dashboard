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

        history.forEach((event, i) => {
            if (event.type === "failed")
            {
                columns.push(<div className="col bg-danger text-center d-flex justify-content-center align-items-center" key={i}>
                    <h4>Failed</h4>
                </div>);
            } else if (event.type === "player") {
                columns.push(<div className="col bg-success text-center d-flex justify-content-center align-items-center" key={i}>
                    <h4>{ event.text }: { event.player }</h4>
                </div>);
            } else {
                columns.push(<div className="col bg-info text-center d-flex justify-content-center align-items-center" key={i}>
                    <h4>{ event.text }</h4>
                </div>);
            }
        });

        for (let i = progress +1; i <= count; i++) {
            columns.push(<div className="col bg-dark text-center d-flex justify-content-center align-items-center" key={-i}>
                <h4 className="text-white-50">{i}</h4>
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
    if (!state.dashboard.question)
    {
        throw new Error("No question found!");
    }

    return {
        progress: state.dashboard.question.progress,
        count: state.dashboard.question.count,
        history: state.dashboard.question.history,
    }
}

export default connect(mapStateToProps)(QuestionState);