import React from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { AnswerStatus, AnswerPlayer } from "../actionTypes/dashboardActionTypes";

import { Spring, Trail } from 'react-spring/renderprops'

interface Props {
    answer: AnswerStatus;
    correct_answered_players: AnswerPlayer[];
}

class Answer extends React.Component<Props>
{
    render()
    {
        const artist = this.props.answer.artist;
        const track = this.props.answer.track;
        const feat = this.props.answer.feat;

        const correct_answered_players = this.props.correct_answered_players;

        return <>
            <div className="col">
                <div className="row">
                    <div className="col-12 text-center">
                        <Spring from={{opacity: 0}} to={{opacity: 1}} config={{duration: 1000}}>
                            {props => {
                                return <h1 className="display-4" style={props}>
                                    {artist} - {track} { feat ? " (" + feat + ")" : '' }
                                </h1>
                            }}
                        </Spring>
                    </div>

                    <div className="col-12 text-center my-5">
                        { correct_answered_players.length === 0 && <>
                            <h3 className="text-danger mt-4">No correct answers</h3>
                        </> }
                        { correct_answered_players.length > 0 && <>
                            <h3 className="text-muted mt-4">Correctly answered</h3>

                            <div className="row justify-content-center">
                                <Trail
                                    items={correct_answered_players}
                                    keys={item => item.player.id}
                                    from={{transform: 'translate3d(0,-10px,0)', opacity: 0}}
                                    to={{transform: 'translate3d(0,0px,0)', opacity: 1}}
                                    config={{
                                        mass: 5,
                                        delay: 100,
                                        duration: 1000,
                                    }}
                                >
                                    {
                                        (player) => (props) => {
                                            return <div className="col-4 m-1" key={player.player.id} style={props}>
                                                <div className="card">
                                                    <h4 className="card-title">
                                                        <b>{player.player.display_name}</b>
                                                    </h4>
                                                    <h5 className="card-subtitle mb-2">
                                                        +{player.points} points
                                                    </h5>
                                                </div>
                                            </div>
                                        }
                                    }
                                </Trail>
                            </div>
                            </>
                        }
                    </div>

                    <div className="col-12 text-center mt-5">
                        <h4>Ready for the next song?</h4>
                    </div>
                </div>
            </div>
        </>
    }
}

const mapStateToProps = (state: RootState): Props => {
    if (!state.dashboard.answer)
    {
        throw new Error("No answer could be found!")
    }

    return {
        "answer": state.dashboard.answer.answer,
        "correct_answered_players": state.dashboard.answer.correct_answered_players,
    };
}

export default connect(mapStateToProps)(Answer);