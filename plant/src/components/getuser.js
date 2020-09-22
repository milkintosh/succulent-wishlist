import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

class Getuser extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user:[] ,
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
                .then(res => this.setState({ user : res}))
                //.then(res => console.log(this.state.users[0].name))
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
        var owned = [], lost = [], wishlist = [];
        this.state.user.forEach(user => {
            if(user.list === "owned") {
                owned.push(
                    <div>
                        <h2>
                            {user.name}
                        </h2>
                        <br/>
                    </div>
                    );
            }
            else if(user.list === "wishlist") {
                wishlist.push(
                    <div>
                        <h2>
                            {user.name}
                        </h2>
                        <br/>
                    </div>
                    );
            }
            else if(user.list === "lost") {
                lost.push(
                <div>
                    <h2>
                        {user.name}
                    </h2>
                    <br/>
                </div>
                );
            }
          });
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
                        <h2>{wishlist}</h2> 
                    </td>
                    <td style={{"width": "33%"}}>
                        <h2>{owned}</h2>
                    </td>
                    <td style={{"width": "33%"}}>
                        <h2>{lost}</h2>
                    </td>
                </tr>
            )
        }
    }
}

export default withAuth0(Getuser);
