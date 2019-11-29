import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { connectionClose, connectionOpen } from '../actions/connectionActions';
import QuestionState from './QuestionState';
import YouTubePlayer from './YouTubePlayer';

interface RouteProps {
    dashboard_id: string;
}

interface Props extends RouteComponentProps<RouteProps> {
    dispatch: Function,
    connectionOpen: Function,
    connectionClose: Function,
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
        return <><h1>
            Dashboard
        </h1>
            <QuestionState />
            <YouTubePlayer />
        </>;
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

export default connect(null, mapDispatchToProps)(Dashboard)