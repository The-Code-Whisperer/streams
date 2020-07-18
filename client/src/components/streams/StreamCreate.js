// creating a stream create page. made it in a separate folder because... just for organization convention, since there's a bunch of links that will be dedicated just for stream manipulation as opposed to App and Header and Modal and the GoogleAuth button :p

import React from 'react'; // need this so this is recognized as a React component
import { connect } from 'react-redux'; // Connect is to wire the action, component, and reducer together. But how to use both reduxForm and connect at the same time? We could write: export default connect()(reduxForm({ form: 'streamCreate', validate })(StreamCreate)); But better to use what's at the bottom.
import { createStream } from '../../actions'; // yes, I made an action just for this component, what about the corresponding reducer? Don't worry, it's in streamReducer.js, and it's sent to streamReducer.js through the export default line here, imported on that reducer page. This is to be able to call the action creator we made.
import StreamForm from './StreamForm'; // we outsourced all the code (in this case just JSX i think) 


// this was originally written as a function component, but since I have helper methods such as onSubmit, it is written as a class component.
class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    // when the button is submitted, call the createStream action creator, with the formValues inputs as the argument, which makes the action run
    this.props.createStream({...formValues, userId: this.props.userId });
  }
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.auth.userId };
}

// as with all connect functions, place the reducer first, the action second, and the component third.
export default connect(mapStateToProps, { createStream })(StreamCreate);

// how the fuck is the action being sent to the reducer??? it's not being named anywhere??? The reducer is taken from, ideally, ../reducers I believe? Okay so the action has a special function called dispatch that Redux knows about and applies the action to the reducers and the store. You can see from the ../../index.js page that reducers is imported there. Actions are not but they go up a chain of pages through the component being affected.