import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { connectionClose, connectionOpen } from '../actions/connectionActions';
import QuestionState from './QuestionState';
import YouTubePlayer from './YouTubePlayer';
import { RootState } from '../reducers/rootReducer';

interface RouteProps {
    dashboard_id: string;
}

interface Props extends RouteComponentProps<RouteProps> {
    dispatch: Function,
    connectionOpen: Function,
    connectionClose: Function,
    connected: boolean,
    waitingForGameState: boolean,
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
        const { connected, waitingForGameState } = this.props;
        return <>
            { connected &&
                <>
                    { waitingForGameState &&
                        <>
                            <h1 className="text-center">Waiting the game begin...</h1>
                        </>
                    }

                    { !waitingForGameState &&
                    <>
                        <QuestionState />
                        <YouTubePlayer />
                    </>
                    }
                </>
            }
            { !connected &&
                <>
                    <h1 className="text-center">Connecting...</h1>
                </> }
        </>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        connected: state.connection.connected,
        waitingForGameState: !state.dashboard.loaded,
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