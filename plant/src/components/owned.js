import React from 'react';
import Header from './header';
import { withAuth0 } from "@auth0/auth0-react";

import Getuser from './getuser';
import LoginButton from './login';

class Collection extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
                    };
    }

    render() {
        const {isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
            return (
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <div style={{"display": "grid", "justify-content": "center", "text-align":"center"}}>
                        <h2>Owned</h2>
                        <br/><br/>
                        <Getuser owned={true}/>
                    </div>
                        {console.log("user is gotten")}
                </div>
            )
        }
        else if(!isAuthenticated && !isLoading) {
            return (
                <LoginButton/>
            )
        }
        else {
            return (
                <p>loading..</p>
            )
        }
    }
}

export default withAuth0(Collection);