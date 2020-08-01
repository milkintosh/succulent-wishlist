import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './plant.css';

import Home from './components/home';
import Collection from './components/collection';
import About from './components/about';
import Contact from './components/contact';
import Profile from './components/profile';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {APIres:""}
  }

  callAPI() {
    fetch("http://localhost:9000/plant")
    .then(res => res.text())
    .then(res => this.setState({APIres:res}));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (       
      //{this.state.APIres}
    <BrowserRouter>
      <div>
        <Switch>
        <Route path="/" component={Home} exact/> 
        <Route path="/collection" component={Collection}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/about" component={About}/>
        <Route path="/profile" component={Profile}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;