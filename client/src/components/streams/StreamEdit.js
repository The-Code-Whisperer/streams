import React from 'react';

// how to get our list of streams into the component? get it from the redux store using the connect function.
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    console.log(this.props);
    if(!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <div>Edit a Stream</div><br/>
        <label>Title</label><br/>
        <input value={this.props.stream.title} /><br/>
        <label>Description</label><br/>
        <input value={this.props.stream.description}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
//add random comment 2
export default connect(mapStateToProps, { fetchStream })(StreamEdit);