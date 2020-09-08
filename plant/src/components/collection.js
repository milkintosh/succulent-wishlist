import React from 'react';
import Header from './header';
import { withAuth0 } from "@auth0/auth0-react";

import Getuser from './getuser';
import LoginButton from './login';

class Collection extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render() {
        const {isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
            return (
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <table class="table table-hover" style={{"margin-left": "auto", "margin-right": "auto","text-align":"center", "width": "75%"}}>
                        <tr class="table-primary">
                            <th style={{"width": "33%"}}>
                                <h2 class="text-light">Wishlist</h2>
                            </th>
                            <th style={{"width": "33%"}}>
                                <h2 class="text-light">Owned</h2>
                            </th>
                            <th style={{"width": "33%"}}>
                                <h2 class="text-light">Lost</h2>
                            </th>
                        </tr>
                        <Getuser/>
                    </table>
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