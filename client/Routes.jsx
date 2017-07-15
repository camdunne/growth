import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Splash from './screens/Splash';
import NewPost from './screens/NewPost';
import AllPosts from './screens/AllPosts';
import ViewPost from './screens/ViewPost';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Splash} />
      <Route path="/newpost" component={NewPost} />
      <Route path="/allposts" component={AllPosts} />
      <Route path="/post/:id" component={ViewPost} />
    </div>
  </Router>
  );
