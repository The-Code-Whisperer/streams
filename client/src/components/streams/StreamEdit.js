import _ from 'lodash';
import React from 'react';

// how to get our list of streams into the component? get it from the redux store using the connect function.
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    console.log(this.props.match.params.id)
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')} // is an object with a title and description property which matches the names we have the fields in streamForm so we're good.
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]};
};

// where the fuck is this exporting to ._.
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);