import React from 'react';
import ReactDOM from 'react-dom'; // notice we don't usually import this in components except for our root index.js. We're importing it here because again we're putting this at the top level.



// this is where we make our portal for modal.html
const Modal = props => {
    // takes 2 arguments. 1. jsx 2. location to render at.
    return ReactDOM.createPortal(
        // these classnames come from semantic ui
        // return to stream list on click, this is event propagation so this onClick applies to every child element unless stopped by stopPropagation().
        <div
            onClick={props.onDismiss}
            className="ui dimmer modals visible active"
        >
            <div
                onClick={e => e.stopPropagation()}
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div> {/* passed down from calling the component. Since this is a functional component we don't call "this" */}
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal') // do not use it at the body tag because it would replace everything at the body. Just make another top level tag called modal.
    );
};

export default Modal;