import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { FullscreenText } from './FullscreenText';

interface Props {
    youtube_id: string | null;
    start: number;
    end: number;
}

interface State {
    done: boolean;
    timer: number;
    playing: boolean;
}

class YouTubePlayer extends Component<Props, State> {

    player_div = createRef<HTMLDivElement>();
    player: YT.Player | null = null;

    timer: NodeJS.Timeout | null = null;

    constructor(props: Props)
    {
        super(props);

        this.state = {
            done: false,
            timer: 0,
            playing: false,
        };
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }

    componentDidMount()
    {
        // On mount, check to see if the API script is already loaded

        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            (window as any)['onYouTubeIframeAPIReady'] = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (!firstScriptTag.parentNode) {
                throw Error("Script not found!")
            }
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else { // If script is already there, load the video directly
            this.loadVideo();
        }
    }

    componentDidUpdate(previousProps: Props)
    {
        if (previousProps.youtube_id !== this.props.youtube_id) {
            this.loadVideo();
        }
    }

    onPlayerReady() {
        if (!this.player) {
            console.error("YouTube player not found!");
            return;
        }
        this.player.playVideo();
    }

    onStateChange(event: YT.OnStateChangeEvent)
    {
        const { end, start } = this.props;
        const { done } = this.state;

        if (event.data === (window as any).YT.PlayerState.PLAYING && !done) {
            var timeout = (end - start) * 1000;
            setTimeout(() => {
                if (!this.player) {
                    console.error("YouTube player not found!");
                    return;
                }

                this.player.pauseVideo();
                if (this.timer) {
                    clearTimeout(this.timer);
                }

                this.setState({
                    timer: 0,
                    playing: false
                });
            }, timeout);

            /* Running timer */
            const runTimer = () => {
                this.timer = setTimeout(() => {
                    this.setState({
                        timer: this.state.timer - 1
                    });

                    runTimer();
                }, 1000);
            }
            runTimer();

            /* Start state */
            this.setState({
                playing: true,
                done: true,
                timer: end - start,
            });
          }
    }

    loadVideo = () => {
        const { youtube_id, start } = this.props;

        if (!youtube_id) {
            console.error("YouTube Video Id not given.");
            return;
        }

        if (!this.player_div.current) {
            console.error("Player div not found.");
            return;
        }

        // the Player object is created uniquely based on the id in props
        const playerOptions: YT.PlayerOptions =  {
            height: '0',
            width: '100%',
            videoId: youtube_id,
            playerVars: {
                start: start,
              },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onStateChange
            },
        };

        // Destroy existing
        if (this.player)
        {
            this.player.destroy();
        }
        if (this.timer)
        {
            clearTimeout(this.timer);
        }
        this.setState({
            playing: false,
            done: false,
            timer: 0,
        });

        this.player = new YT.Player(this.player_div.current, playerOptions);
      };


    render()
    {
        const { timer, playing, done } = this.state;
        const { start, end } = this.props;

        let has_progress = false;
        let width_percent = "0%";

        if (end-start > 0) {
            has_progress = true;
            width_percent = ( ((end-start) - timer) / (end-start)) * 100 + "%";
        }

        return <div>
            <div id="player" ref={ this.player_div } />
            { !playing && !done &&
                <h1 className="text-center text-muted">Loading...</h1> }
            { playing &&
                <div className="timer">
                    <FullscreenText text="Listen carefully!" />
                    <h4>{timer} seconds remaining...</h4>
                    {
                        has_progress && <>
                            <div className="progress" style={{height: "60px"}}>
                                <div className="progress-bar" role="progressbar" style={{width: width_percent}}></div>
                            </div>
                        </>
                    }
                </div> }
            { !playing && done &&
                <FullscreenText text="Start guessing!" /> }
        </div>;
    }
}

const mapStateToProps = (state: RootState): Props => {
    return {
        youtube_id: state.dashboard.youtube_id,
        start: state.dashboard.start,
        end: state.dashboard.end,
    }
}

export default connect(mapStateToProps)(YouTubePlayer);