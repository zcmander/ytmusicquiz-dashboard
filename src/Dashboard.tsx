import React, { Component } from 'react';

import { RouteComponentProps } from 'react-router-dom';


interface Props {
    dashboard_id: string;
}


export class Dashboard extends Component<RouteComponentProps<Props>> {

    componentDidMount() {
        const dashboard_id = this.props.match.params.dashboard_id;

        const chatSocket = new WebSocket(
            'ws://' + window.location.host +
            '/api/dashboard/' + dashboard_id + '/');

    }

    render()
    {
        return <h1>
            Dashboard
        </h1>;
    }
}