import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js'; // thinkable like axios in that this reaches out to a remote server, gets data, and converts to be presentable here. downloads the video stream and converts it to a file that is playable 
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    // for a refresher, super(props) must be called for this.props to not be undefined.
    super(props);
    this.videoRed = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    // retrieve the stream that is in the url, then fetch the stream
    this.props.fetchStream(id);
    // attempt to build player but only if the player has not been build before and the stream is loaded.    
    this.buildPlayer();
  }
  // just in case the fetchStream action completes and we need to attempt to build the player again
  componentDidUpdate() {
    this.buildPlayer();
  }
  // when the component is left as in navigated away from 
  componentWillUnmount() {
    this.player.destroy(); // stops asking for the stream
  }
  buildPlayer() {
    // if the player has already been created OR if the stream prop was not loaded yet (if either ready condition has not been yet, destroy this firing)
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    // retrieve the stream that is in the url, then fetch the stream
    this.props.fetchStream(id);
    // only set up this video player after we know the video tag is present with the ref assigned.
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv` // the stream name here has nothing to do with this rtmp server stream name. This name is specified when the user streams software for example in OBS.
    });
    this.player.attachMediaElement(this.videoRed.current); // attaching the media player to the videoRed ref creates an error because when we're first loading we're not creating the video element at all, meaning we never attach our ref to this.videoRed.
    this.player.load();
  }
  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      )
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRed} style={{ width: '100%' }} controls /> {/* sets controls to true */}
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream })(StreamShow);