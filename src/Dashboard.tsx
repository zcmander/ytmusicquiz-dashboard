import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';


import QuestionState from './QuestionState';

interface RouteProps {
    dashboard_id: string;
}

interface Props extends RouteComponentProps<RouteProps> {
    dispatch: Function,
}


class Dashboard extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.onMessage = this.onMessage.bind(this);
    }

    componentDidMount() {
        const dashboard_id = this.props.match.params.dashboard_id;

        const ws = new WebSocket(
            'ws://' + window.location.host +
            '/api/dashboard/' + dashboard_id + '/');

        ws.onmessage = this.onMessage;
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
        </>;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: dispatch,
    };
}

export default connect(null, mapDispatchToProps)(Dashboard)