import React from 'react';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css';
import { withAuth0 } from "@auth0/auth0-react";

import Header from './header';
import API from './API';

class Results extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount = () => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let name=params.get('name');
        this.state.name = name;
    }

    //must create a new page of results from the search, and if nothing is found, display something else... and maybe suggest adding it manually...
    render () {
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                
                <div style={{"display": "grid", "justify-content": "center", "text-align":"center"}}>
                    <h1>search results for: {this.state.name}</h1>
                    {this.state.name &&
                    <API category = {this.state.name.replace(/\s/g,'&')}/> }
                </div>
            </div>
        );
    }
}

export default withAuth0(Results);