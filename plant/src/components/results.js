import React from 'react';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert2';
import 'font-awesome/css/font-awesome.min.css';
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
        this.state.name = params.get('name');
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
                    <API key = {this.state.name} category = {this.state.name}/> }
                </div>
            </div>
        );
    }
}

export default withAuth0(Results);