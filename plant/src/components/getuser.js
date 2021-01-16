import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

class Getuser extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user:[] ,
            calledAPI : 0
         };
    }
    
    callAPI = () => {
        const { user, isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
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

    removePlant = (prop) => {
        //remove the plant from SQL
        //make sure that the user is sure they want to delete before deleting
        swal.fire({
            title: 'Are you sure you would like to remove this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const { user, isAuthenticated, isLoading } = this.props.auth0;
                if(isAuthenticated && !isLoading) {
                    return fetch("http://localhost:9000/sql?email=" + user.email + "&remove=" + prop) 
                    .then(res => res.json())
                    .then(res => this.setState({ user : res}))
                    .catch( () => {
                        swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: "Sorry, error fetching data. Try again later.",
                        })
                    });
                }
            }
            else {
                return;
            }
          })
    }

    componentDidMount () {
        console.log("mounted");
        this.callAPI()
    }

    render () {
        var owned=[],
            lost=[],
            wishlist=[];
        this.state.user.forEach(user => {
            if(user.list === "owned") {
                owned.push(
                    <div>
                        <h2>
                            {user.name}
                            {" "}
                            <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(user.name)}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
                            {" "}
                            <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(user.name)}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
                        {" "}
                        <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(user.name)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </h2>
                    <br/>
                </div>
                );
            }
          });
          console.log("rendering");
        const { isAuthenticated, isLoading } = this.props.auth0;
        if (isLoading) {
            return <div>Loading ...</div>;
        }
        else if(!isLoading) {
            // if(this.state.calledAPI === 0) {
            //     this.callAPI()
            //     .then(this.setState({calledAPI:1}))
            // } //have to call the api only once for some reason, or else refreshing the page doesn't work...
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
