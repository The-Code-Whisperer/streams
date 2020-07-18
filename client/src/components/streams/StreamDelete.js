import React from 'react';
import { deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  onSubmit() {
    this.props.deleteStream();
  }
  render() {
    return (
      <div>
        StreamDelete
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          Are you sure you wish to delete this stream?
          <button type="submit">Yes</button>
          <Link to="/">No</Link>
        </form>
      </div>
    );
  }
};



export default connect(null, { deleteStream })(StreamDelete);
