import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'
import QRCode from 'qrcode.react';

import { connectionClose, connectionOpen } from '../actions/connectionActions';
import QuestionState from './QuestionState';
import YouTubePlayer from './YouTubePlayer';
import { RootState } from '../reducers/rootReducer';
import { FullscreenText } from './FullscreenText';
import PlayerStatistic from './PlayerStatistics';
import Answer from './Answer';
import GameOver from './GameOver';
import { Logo } from './Logo';

interface RouteProps {
    dashboard_id: string;
}

interface Props extends RouteComponentProps<RouteProps> {
    dispatch: Function;
    connectionOpen: Function;
    connectionClose: Function;
    connected: boolean;
    waitingForGameState: boolean;
    state: "QUESTION" | "ANSWER" | "GAMEOVER";
    dashboard_id: string | null;
    gameConnected: boolean;
}


class Dashboard extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    componentDidMount() {
        const ws = new WebSocket(
            'ws://' + window.location.host +
            '/api/dashboard/');

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
        const { connected, waitingForGameState, state, dashboard_id, gameConnected } = this.props;

        const qrPlaceholder = <div style={{width: 512, height: 512}}></div>;

        return <>
            <div className="row h-100 justify-content-center align-items-center">
                { (!connected || (connected && waitingForGameState)) &&
                    <div className="col-12"><Logo /></div> }
                { connected && <>
                    { waitingForGameState && <>
                        { (dashboard_id && !gameConnected) &&
                            <Spring
                                from={{
                                    transform: 'translate3d(0,200px,0) scale(0)',
                                    opacity: 0
                                }}
                                to={{
                                    transform: 'translate3d(0,0px,0) scale(1)',
                                    opacity: 1
                                }}
                                config={{
                                    mass: 1,
                                    tension: 10,
                                    friction: 5,
                                    velocity: 0,
                                }}
                            >
                                {props => <QRCode value={dashboard_id} size={512} includeMargin={true} style={props} /> }
                            </Spring>}
                        { !gameConnected &&
                            <FullscreenText text={"Waiting a game to be created..."} /> }
                        { gameConnected &&
                            <>
                            {qrPlaceholder}
                            <FullscreenText text={"Waiting the game begin..."} />
                            </>}
                        </> }

                    { !waitingForGameState && <>
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
                        { state === "GAMEOVER" && <>
                                <div className="col-12">
                                    <GameOver />
                                </div>
                            </>}
                        </> }
                    </>
                }
                { !connected &&
                    <>
                    {qrPlaceholder}
                    <FullscreenText text={"Connecting..."} />
                    </>}
            </div>
        </>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        connected: state.connection.connected,
        waitingForGameState: !state.dashboard.loaded,
        state: state.dashboard.state,
        dashboard_id: state.dashboard.id,
        gameConnected: state.dashboard.connected_to_game,
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