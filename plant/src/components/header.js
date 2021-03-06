import React from 'react';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

import LogoutButton from './logout';
import Results from './results';

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }

    RenderResults = () => {
        //send a prop to results component
        if(this.state.name) {
            window.location.assign("/results?name=" + this.state.name);
        }
    }

    handleChange = ({target})=>  {
        this.setState({[target.name]: target.value});
    };

    onKeyPress = (e) => {
        if(e.key === "Enter") {
          this.RenderResults();
        }
    }

    render () {
        const { isAuthenticated,isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
        return (
            <div>
              <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <h1><NavLink to="/" class = "nav-link"><i class="fab fa-envira"></i></NavLink></h1>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
          
              <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                  <h4><NavLink to="/collection" class = "nav-link">Collection</NavLink></h4> 
                  </li>
                  <li class="nav-item">
                  <h4><NavLink to="/wishlist" class = "nav-link">Lust & Lost</NavLink></h4> 
                  </li>
                  <li class="nav-item">
                  <h4><NavLink to="/about" class = "nav-link">About</NavLink></h4> 
                  </li>
                  <li class="nav-item">
                  <h4><NavLink to="/contact" class = "nav-link">Contact</NavLink> </h4>
                  </li>
              </ul>
              <div class="form-inline my-2 my-lg-0">
                <input name = "name" value = {this.state.name} class="form-control mr-sm-2" type="text" placeholder="Search" onChange = {this.handleChange} onKeyPress = { (e) => this.onKeyPress(e)}/>
                <button class="btn btn-secondary my-2 my-sm-0" onClick = { () => this.RenderResults() }>Search</button>
                {/*for search we have to send this to another component because the search button is part of the header, not a page
                so we can't really just mutate the page to be something else, we have to redirect to a results page or something...*/}
              </div>
              </div>

              <LogoutButton/>
              </nav>
          </div>
        );
        }
        else if(!isAuthenticated && !isLoading){
            return (
                <div>
                  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                  <h1><NavLink to="/" class = "nav-link"><i class="fab fa-envira"></i></NavLink></h1>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                  </button>
              
                  <div class="collapse navbar-collapse" id="navbarColor01">
                  <ul class="navbar-nav mr-auto">
                      <li class="nav-item">
                      <h4><NavLink to="/collection" class = "nav-link">Your Collection</NavLink></h4> 
                      </li>
                      <li class="nav-item">
                      <h4><NavLink to="/wishlist" class = "nav-link">Lust & Lost</NavLink></h4> 
                      </li>
                      <li class="nav-item">
                      <h4><NavLink to="/about" class = "nav-link">About</NavLink></h4> 
                      </li>
                      <li class="nav-item">
                      <h4><NavLink to="/contact" class = "nav-link">Contact</NavLink> </h4>
                      </li>
                  </ul>
                  <div class="form-inline my-2 my-lg-0">
                    <input name = "name" value = {this.state.name} class="form-control mr-sm-2" type="text" placeholder="Search" onChange = {this.handleChange} onKeyPress = { (e) => this.onKeyPress(e)}/>
                    <button class="btn btn-secondary my-2 my-sm-0" onClick = { () => this.RenderResults() }>Search</button>
                  </div>
                  </div>
                  </nav>
              </div>
            );
        }
        else {
            return (
                <p>loading...</p>
            )
        }
    }
}

export default withAuth0(Header);