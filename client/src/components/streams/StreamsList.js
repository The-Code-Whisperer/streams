import React from 'react';
// need this because we are connecting the action and component together at the bottom. We don't put the reducer in because the action will call the reducer as it's already wired. It's centrally wired at ../../index.js
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// need the action
import { fetchStreams } from '../../actions';

// we use a class instead of a function component since we are using helper functions like componentDidMount
class StreamsList extends React.Component {
  componentDidMount() {
    // call the action creator as soon as the page loads
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/update/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }

  }
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );

    });

  }
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}


// this connects the properties we want given to the streamList component which would be accessed using this.props.streams, etc, as well as enabling the action creator fetchStreams inside props as well. Make sure the client server and api server are running for this. So the connect function maps state properties first, actions second, and the component last.
export default connect(mapStateToProps, { fetchStreams })(StreamsList);