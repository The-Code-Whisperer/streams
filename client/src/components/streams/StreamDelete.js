import React from 'react';
import Modal from '../Modal';

const StreamDelete = () => {
  return (
    <div>
      StreamDelete
      <Modal />
    </div>
  );
};

export default StreamDelete;


// my attempt
// class StreamDelete extends React.Component {
//   componentDidMount() {
//     this.props.fetchStream(this.props.match.params.id);
//   }
//   render() {
//     if (!this.props.stream) {
//       return <div>Loading...</div>;
//     }
//     return <div>Are you sure you want to delete {this.props.stream.title}?</div>;
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return { stream: state.streams[ownProps.match.params.id] };
// };



// export default connect(mapStateToProps, {fetchStream})(StreamDelete);