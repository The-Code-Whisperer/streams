import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal'
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  // in Stephen's video, wrapping a div around the two button tags causes semantic ui to display the buttons incorrectly (pushes them against the bottom of the modal). In my version the buttons are displayed correctly. But Stephen's solution to his problem is to replace the divs with React.Fragment which is an invisible wrapper, as in it isn't seen within the DOM. Abbreviation is just an empty wrapper.
  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative">Delete</button
        >
        <button onClick={() => history.push('/')} className="ui button">Cancel</button>
      </>
    );
  }

  renderContent() {
    // if the mapStateToProps did not yet load the stream in, since it may take longer than to show the modal
    if (!this.props.stream) {
      this.props.fetchStream(this.props.match.params.id);
      return ('Are you sure you want to delete this stream?');
    } else {
      return (`Are you sure you want to delete the stream: ${this.props.stream.title}`);
    }

  }

  // no need for a wrapping, separating div since all the contents (Modal component) is getting thrown up to the modal tag in index.html anyway.
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  };
}

// state is the global state in our redux store. ownProps is the props being passed into our component here in StreamDelete, here needed so we can look at that this.props.match.params.id property
const mapStateToProps = (state, ownProps) => {
  // the key provides a this.props.streams property for the component. The value goes into the state, takes the stream property (which only has the one stream for now called by the cDM function)
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(null, { fetchStream, deleteStream })(StreamDelete);
