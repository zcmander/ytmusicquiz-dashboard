import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { connectionClose, connectionOpen } from '../actions/connectionActions';
import QuestionState from './QuestionState';
import YouTubePlayer from './YouTubePlayer';
import { RootState } from '../reducers/rootReducer';
import { FullscreenText } from './FullscreenText';
import PlayerStatistic from './PlayerStatistics';
import Answer from './Answer';

interface RouteProps {
    dashboard_id: string;
}

interface Props extends RouteComponentProps<RouteProps> {
    dispatch: Function,
    connectionOpen: Function,
    connectionClose: Function,
    connected: boolean,
    waitingForGameState: boolean,
    state: "QUESTION" | "ANSWER";
}


class Dashboard extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    componentDidMount() {
        const dashboard_id = this.props.match.params.dashboard_id;

        const ws = new WebSocket(
            'ws://' + window.location.host +
            '/api/dashboard/' + dashboard_id + '/');

        ws.onmessage = this.onMessage;
        ws.onclose = this.onClose;
        ws.onopen = this.onOpen;
    }

    onOpen()
    {
        const { connectionOpen } = this.props;
        connectionOpen();
    }

    onClose()
    {
        const { connectionClose } = this.props;
        connectionClose();
    }

    onMessage(message: MessageEvent)
    {
        const { dispatch } = this.props;

        dispatch(JSON.parse(message.data));
    }

    render()
    {
        const { connected, waitingForGameState, state } = this.props;
        return <>
            { connected &&
                <>
                    { waitingForGameState &&
                        <FullscreenText text={"Waiting the game begin..."} />}

                    { !waitingForGameState &&

                    <div className="row h-100 justify-content-center align-items-center">
                        { state === "QUESTION" && <>
                                <div className="col-12 align-self-start">
                                    <QuestionState />
                                </div>
                                <div className="col-12">
                                    <YouTubePlayer />
                                </div>
                                <div className="col-12 align-self-end">
                                    <PlayerStatistic />
                                </div>
                            </> }
                        { state === "ANSWER" && <>
                                <div className="col-12">
                                    <Answer />
                                </div>
                            </> }
                    </div>
                    }
                </>
            }
            { !connected &&
                <FullscreenText text={"Connecting..."} /> }
        </>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        connected: state.connection.connected,
        waitingForGameState: !state.dashboard.loaded,
        state: state.dashboard.state,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        ...bindActionCreators({
            connectionOpen,
            connectionClose,
        }, dispatch),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)