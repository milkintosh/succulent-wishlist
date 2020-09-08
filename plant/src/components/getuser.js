import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

class Getuser extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            plants : [],
            wishlist : [],
            lost : [],
            calledAPI : 0,
         };
    }
    
    callAPI = () => {
        const { user, isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
            if(user.logins_count === 1) {
                return fetch("http://localhost:9000/sql?email=" + user.email + "&signup=1")
                .catch( () => {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Sorry, error fetching data. Try again later.",
                    })
                });
            }
            else {
                return fetch("http://localhost:9000/sql?email=" + user.email ) 
                .then(res => res.json())
                .then(res => this.setState({ plants : res.plants, wishlist : res.wishlist, lost : res.lost }))
                .catch( () => {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Sorry, error fetching data. Try again later.",
                    })
                });
            }
        }
    }

    render () {
        const { isAuthenticated, isLoading } = this.props.auth0;
        if (isLoading) {
            return <div>Loading ...</div>;
        }
        else if(!isLoading) {
            if(this.state.calledAPI === 0) {
                this.callAPI()
                .then(this.setState({calledAPI:1}))
            } //have to call the api only once for some reason, or else refreshing the page doesn't work...
            return ( //have to format the arrays to make them look better when displaying
                isAuthenticated && 
                <tr>
                    <td style={{"width": "33%"}}>
                        <h2>{this.state.wishlist}</h2> 
                    </td>
                    <td style={{"width": "33%"}}>
                        <h2>{this.state.plants}</h2>
                    </td>
                    <td style={{"width": "33%"}}>
                        <h2>{this.state.lost}</h2>
                    </td>
                </tr>
            )
        }
    }
}

export default withAuth0(Getuser);
