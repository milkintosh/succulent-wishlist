
import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

import LoginButton from './login';

class API extends React.Component {
constructor (props) {
    super(props);

    this.state = {
                items:[{}],
                pages:'',
                loading:true,
                user:this.props.auth0,
                category:this.props.category,
     };
}

callAPI = (e) => {
    var url = '';
    if(e) {
        url = "http://localhost:9000/plant?category=" + this.state.category + "&page=" + e;
    }
    else {
        url = "http://localhost:9000/plant?category=" + this.state.category;
    }
    return fetch(url)
        .then(res => res.json())
        .then(res => this.setState({items:Object.keys(res.data).map((t) => ({scientific_name:res.data[t].scientific_name, 
                common_name:res.data[t].common_name,
                image_url:res.data[t].image_url})),
                pages:res.links.last}))
        .then(e ? this.setState({page:e}): this.setState({page:1}))
        .catch( () => {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Sorry, error fetching data. Try again later.",
            }).then(
            this.setState({category:""}))
        });
}

addOwned = (prop) => {
    const { user, isAuthenticated } = this.props.auth0;
    if(isAuthenticated) {
        if(user) {
            return fetch("http://localhost:9000/sql?email=" + user.email + "&owned=" + prop)
            .then(res => res.text())
            .then(res => swal.fire({
                icon: res,
                title: 'Successfully added'
            }))
            .catch( () => {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Sorry, error fetching data. Try again later.",
                })
            })
        }
        else {
            window.location.replace("/login");
        }
    }
    else {
        window.location.replace("/login");
    }
}

addWishlist = (prop) => {
    const { user, isAuthenticated } = this.props.auth0;
    if(isAuthenticated) {
        if(user) {
            var url = "http://localhost:9000/sql?email=" + user.email + "&wishlist=" + prop;
            return fetch(url)
            .then(res => res.text())
            .then(res => swal.fire({
                icon: res,
                title: 'Successfully added'
            }))
            .catch( () => {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Sorry, error fetching data. Try again later.",
                })
            })
        }
        else {
            window.location.replace("/login");
        }
    }
    else {
        window.location.replace("/login");
    }
}

addLost = (prop) => {
    const { user, isAuthenticated } = this.props.auth0;
    if(isAuthenticated) {
        if(user) {
            return fetch("http://localhost:9000/sql?email=" + user.email + "&lost=" + prop)
            .then(res => res.text())
            .then(res => swal.fire({
                icon: res,
                title: 'Successfully added'
            }))
            .catch( () => {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Sorry, error fetching data. Try again later.",
                })
            })
        }
        else {
            window.location.replace("/login");
        }
    }
    else {
        window.location.replace("/login");
    }
}

Clicked = (e) => {
    //this is to get the contents of each page
    this.setState({loading:true})
    this.callAPI(e).then(() => {
    this.setState({loading:false})})
}

componentDidMount () {
    //this is to get the content of the first page
    this.setState({loading:true})
    this.callAPI().then(() => {
    this.setState({loading:false})})
}

render () {
    //do a regex to extract the value we want from the page string from trefle
        if(this.state.loading === false) {
            console.log(this.state.loading);
            var value = this.state.pages.match(/page=(\d+)/i);

            //create html child for each page 'gracefully' with mapping a new array
            var pages = new Array(Number(value[1])).fill(0).map(( zero, index ) => index+1 === this.state.page ?
            <button key = {index} class="btn btn-link disabled" onClick = { () => this.Clicked(index+1)}>{index+1}</button> :
            <button key = {index} class="btn btn-link" onClick = { () => this.Clicked(index+1)}>{index+1}</button>
            )
            var children = [];
            //do a loop to create an html child from each item retrieved from the trefle query
            this.state.items.forEach((item, i) => {
                children.push(<div key = {i} class="card border-primary mb-3" style={{"max-width": "50rem", "text-align":"left"}}> 
                    <h4 class="card-header">scientific name: {item["scientific_name"]} 
                        <div style = {{"text-align":"right"}}>
                            <button class="btn btn-secondary" onClick = { () => this.addWishlist(item["scientific_name"])} title = "wishlist"><i class="fa fa-heart" aria-hidden="true"></i></button>
                            <button class="btn btn-secondary" onClick = { () => this.addOwned(item["scientific_name"])} title = "owned"><i class="fa fa-leaf" aria-hidden="true"></i></button>
                            <button class="btn btn-secondary" onClick = { () => this.addLost(item["scientific_name"])} title = "lost"><i class="fa fa-frown-o" aria-hidden="true"></i></button>
                        </div>
                    </h4>
                    <br/>
                    <h4 class="card-body">common name: {item["common_name"]}</h4>
                    <img src={item["image_url"]} alt={"trefle API image of " + item["scientific_name"]}></img> 
                    </div>);
            });
            if(children.length !== 0) {
            return (
                <div>
                    {pages}
                    <div>
                        {children}
                    </div>
                    {pages}
                </div>
            )
            }
            else {
                return (
                    <div>
                        <br></br>
                        Couldn't find what you were looking for. Try requesting a change to the Trefle database!
                    </div>
                )
            }
        }
        else if(this.state.loading === true) {
            return (
                <div>
                    loading...
                </div>
            )
        }
    }
}

export default withAuth0(API);