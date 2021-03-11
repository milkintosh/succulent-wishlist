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
            .then(res => this.setState({user : res}))
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
        this.callAPI()
    }

    render () {
        var owned=[],
            lost=[],
            wishlist=[];
        this.state.user.forEach((item, i) => {
            var light, water;
            switch(item['light']) {
                case 1: light = "full shade to bright light";break;
                case 2: light = "partial shade to partial sun";break;
                case 3: light = "full sun to partial shade";break;
                default:
            }
            switch(item['water']) {
                case 1: water = "less than your average succulent";break;
                case 2: water = "average for a succulent";break;
                case 3: water = "more than your average succulent";break;
                default:
            }
            if(item['list'] === "owned") {
                owned.push(
                    <div class="card border-primary mb-3" style={{"max-width": "50rem", "text-align":"left"}}> 
                    <div class="card-header" style = {{"text-align":"right"}}>
                    <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                    <div class="card-body">
                    <h4 class="card-title">{item['name']} </h4>
                    <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fab fa-centos"></i>Light: {light}</h6>
                    <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-hand-holding-water"></i>Water: {water}</h6>
                    <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-bed"></i>Dormancy Period: {item['dormancy']}</h6>
                    <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-wind"></i>Hardiness: {item['hardiness']}</h6>
                    </div>
                <br/>
                {/* </div>

                    <div>
                        <h2>
                            {user.name}
                            {" "}
                            <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(user.name)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </h2>
                        <br/>*/}
                    </div> 
                    );
            }
            else if(item['list'] === "wishlist") {
                wishlist.push(
                    <div>
                        <h2>
                            {item['name']}
                            {" "}
                            <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </h2>
                        <br/>
                    </div>
                    );
            }
            else if(item['list'] === "lost") {
                lost.push(
                <div>
                    <h2>
                        {item['name']}
                        {" "}
                        <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
        //have to format the arrays to make them look better when displaying
        else if(!isLoading) {
            //API called when mounting
            if(this.props.owned) 
                return (
                    isAuthenticated &&
                        <h2>{owned}</h2>
                )
            else if(this.props.wishlist) 
                return (
                    isAuthenticated &&
                    <tr>
                        <h2>{wishlist}</h2>
                        <h2>{lost}</h2>
                    </tr>
                )
            else if(this.props.lost)
                    return (
                        <tr>
                            <h2>{lost}</h2>
                        </tr>
                    )
        }
    }
}

export default withAuth0(Getuser);
