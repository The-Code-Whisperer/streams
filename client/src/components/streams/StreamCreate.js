// creating a stream create page. made it in a separate folder because... just for organization convention, since there's a bunch of links that will be dedicated just for stream manipulation as opposed to App and Header and Modal and the GoogleAuth button :p

import React from 'react'; // need this because DUH
import { connect } from 'react-redux'; // if you ask why we need this then you're just dumb
import { createStream } from '../../actions'; // yes, I made an action just for this component, what about the corresponding reducer? Don't worry, it's in streamReducer.js, and it's sent to streamReducer.js through the export default line here, imported on that reducer page.
import StreamForm from './StreamForm'; // we outsourced all the code (in this case just JSX i think) 


// this was originally written as a function component, but since I have helper methods such as onSubmit, it is written as a class component.
class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
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

export default connect(null, { createStream })(StreamCreate);