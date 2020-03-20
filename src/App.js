import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Createuser from './components/createuser';
import  './bootstrap.min.css';
class App extends Component {
  render() {
    return (
    <Router>
        <div className="container">
          <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
         <h1> <Link to ="/" className="navbrand text-white">ExcerTracker</Link></h1>
          <div className="collpase navbar-collapse" >
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Exerice</Link></li>
            <li><Link to={'/contact'} className="nav-link">Create</Link></li>
            <li><Link to={'/about:id'} className="nav-link">Edit</Link></li>
            <li><Link to={'/createuser'} className="nav-link">Createuser</Link></li>
          </ul>
          </div>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
              <Route path='/createuser' component={Createuser} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;