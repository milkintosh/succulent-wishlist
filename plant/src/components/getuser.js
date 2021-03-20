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

    moveList = (list, plant) => {
        swal.fire({
            title: 'Do you want to move this item to the ' + list + ' list?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, move it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const { user, isAuthenticated, isLoading } = this.props.auth0;
                if(isAuthenticated && !isLoading) {
                    return fetch("http://localhost:9000/sql?email=" + user.email + "&list=" + list +'&name=' + plant) 
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
            var body=<div class="card-body">
                <h4 class="card-title">{item['name']} </h4>
                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fab fa-centos"></i>Light: {light}</h6>
                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-hand-holding-water"></i>Water: {water}</h6>
                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-bed"></i>Dormancy Period: {item['dormancy']}</h6>
                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="far fa-snowflake"></i>Hardiness: {item['hardiness']}</h6>
            </div>;

            var html;
            if(item['list'] === "owned") {
                html = <div class="card border-primary mb-3" style={{"width": "50rem", "height":"15rem","text-align":"left"}}> 
                            <div class="card-header" style = {{"text-align":"right"}}>
                                <button title="moveToLust" class = "btn btn-outline-primary" onClick={() => this.moveList('wishlist',item['name'])}><i class="fa fa-heart" aria-hidden="true"></i></button>
                                <button title="moveToLost" class="btn btn-outline-primary" onClick={() => this.moveList('lost',item['name'])}><i class="fas fa-dizzy"></i></button>
                                <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                            {body}
                            <br/>
                        </div>;
                owned.push(html);
            }
            else if(item['list'] === "wishlist") {
                html = <div class="card border-primary mb-3" style={{"width": "50rem", "height":"15rem","text-align":"left"}}> 
                            <div class="card-header" style = {{"text-align":"right"}}>
                                <button title="moveToOwned" class = "btn btn-outline-primary" onClick={() => this.moveList('owned',item['name'])}><i class="fa fa-leaf" aria-hidden="true"></i></button>
                                <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                            {body}
                            <br/>
                        </div>;
                wishlist.push(html);
            }
            else if(item['list'] === "lost") {
                html = <div class="card border-primary mb-3" style={{"width": "50rem", "height":"15rem","text-align":"left"}}> 
                            <div class="card-header" style = {{"text-align":"right"}}>
                                <button title="moveToLust" class = "btn btn-outline-primary" onClick={() => this.moveList('wishlist',item['name'])}><i class="fa fa-heart" aria-hidden="true"></i></button>
                                <button title="moveToOwned" class="btn btn-outline-primary" onClick={() => this.moveList('owned',item['name'])}><i class="fas fa-leaf"></i></button>
                                <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                            {body}
                            <br/>
                        </div>;
                lost.push(html);
            }
          });
        const { isAuthenticated, isLoading } = this.props.auth0;
        if (isLoading) {
            return <div>Loading ...</div>;
        }
        //have to format the arrays to make them look better when displaying
        else if(!isLoading) {
            //API called when mounting
            if(this.props.owned) {
                if(owned.length !==0)
                    return (
                        isAuthenticated &&
                            <h2>{owned}</h2>
                            )
                else
                    return (
                        isAuthenticated &&
                        <p> It looks like you don't have anything in your list. You can use the search bar to search for a specific plant, too.</p>
                    )
            }
            else if(this.props.wishlist) 
                if(wishlist.length !==0)
                    return (
                        isAuthenticated &&
                        <tr>
                            <h2>{wishlist}</h2>
                        </tr>
                    )
                else
                    return (
                        isAuthenticated &&
                        <p> It looks like you don't have anything in your list. You can use the search bar to search for a specific plant, too.</p>
                    )
            else if(this.props.lost)
                if(lost.length !==0)
                    return (
                        isAuthenticated &&
                        <tr>
                            <h2>{lost}</h2>
                        </tr>
                    )
                else
                    return (
                        isAuthenticated &&
                        <p> It looks like you don't have anything in your list. You can use the search bar to search for a specific plant, too.</p>
                    )
        }
    }
}

export default withAuth0(Getuser);
