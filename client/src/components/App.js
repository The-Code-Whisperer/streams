import React from 'react'; // this is so this function is known to React
import { Router, Route } from 'react-router-dom'; // this we'll know just from memory that it allows routing based on a browser address, Router must wrap all Route attributes
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header'; // applies a written header we can see at Header.js
import history from '../history'; // we imported the function createBrowserHistory() from the history package, now import it here because why not make more pages, I guess.


// this is an example of basic routing, there's also other kinds of routing such as nested routing within reacttraining.com
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} /> {/* exact specifies a requirement for the exact specified URL rather than extensions being included. component specifies what to show upon requesting that route. */}
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div >
  );
}

export default App;
