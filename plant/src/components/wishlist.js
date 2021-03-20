import React from 'react';
import Header from './header';
import { withAuth0 } from "@auth0/auth0-react";

import Getuser from './getuser';
import LoginButton from './login';

class Wishlist extends React.Component {
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
                    <table style={{"width":"50%", "textAlign":"center", "float":"left"}}>
                        <tbody>
                            <tr>
                                <h2>Lust</h2>
                            </tr>
                            
                            <tr style={{"justifyContent":"center", "display":"flex"}}>
                                <Getuser wishlist={true}/>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{"width":"50%", "textAlign":"center", "float":"left"}}>
                        <tbody>
                            <tr>
                                <h2>Note:</h2>
                            </tr>
                            <tr style={{"justifyContent":"center", "display":"flex"}}>
                                <div class="card border-danger mb-3" style={{"width":"40rem"}}>
                                <h5 class="card-body">Plants need much less water during dormancy.</h5>
                                </div>
                            </tr>
                            <br/>

                            <tr>
                                <h2>
                                    Lost
                                </h2>
                            </tr>

                            <tr style={{"justifyContent":"center", "display":"flex"}}>
                                <Getuser lost={true}/>
                            </tr>
                        </tbody>
                    </table>
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

export default withAuth0(Wishlist);