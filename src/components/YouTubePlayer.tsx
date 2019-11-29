import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

interface Props {
    youtube_id: string | null;
}


class YouTubePlayer extends Component<Props> {

    render()
    {
        const { youtube_id } = this.props;
        return <>
            <h3>{youtube_id}</h3>
        </>;
    }
}

const mapStateToProps = (state: RootState): Props => {
    return {
        youtube_id: state.dashboard.youtube_id,
    }
}

export default connect(mapStateToProps)(YouTubePlayer);