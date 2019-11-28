import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';

interface Props {
    progress: number;
    count: number;
}


class QuestionState extends Component<Props> {

    render()
    {
        const { progress, count } = this.props;
        return <>
            <h2>{progress} / {count}</h2>
        </>;
    }
}

const mapStateToProps = (state: RootState): Props => {
    return {
        progress: state.dashboard.question_progress,
        count: state.dashboard.question_count,
    }
}

export default connect(mapStateToProps)(QuestionState);