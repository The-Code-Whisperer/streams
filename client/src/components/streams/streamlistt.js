// this is a component of streams that just shows the list of streams, which should already be listed in the state.

import React from 'react'; // import the react library as React in order for js to understand what Components are.
import { connect } from 'react-redux'; // import the connect function from react-redux in order to connect state and props into the react component. Redux is the name of the library that makes js understand state.
import { fetchStreams } from '../../actions'; // import this action from index.js which returns a response.data from our website using a dispatch function.

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    } // as soon as the component mounts, call the fetchStreams action creator, which will retrieve a response.data, so we can use it later as it's then saved in our props already.

    // the purpose of this function is to render a list of streams
    renderList() {
        // take the array of streams in props (which got there through our action component which was mapped using mapStateToProps) and map each stream using the following function
        return this.props.streams.map(stream => {
            return (
                // just a bunch of jsx converting to html
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{SVGFEComponentTransferElement.description}</div>
                    </div>
                </div>
            );
        });
    }
