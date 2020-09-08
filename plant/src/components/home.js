import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

import Header from './header';

class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {category:"", 
                    items:[{}],
                    loading:false,
                    user:this.props.auth0,
         };
    }

    callAPI = () => {
        return fetch("http://localhost:9000/plant?category=" + this.state.category)
        .then(res => res.json())
        .then(res => this.setState({items:Object.keys(res.data).map((t) => ({scientific_name:res.data[t].scientific_name, 
                common_name:res.data[t].common_name,
                image_url:res.data[t].image_url}))}))
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
        const { user } = this.props.auth0;
        return fetch("http://localhost:9000/sql?email=" + user.email + "&owned=" + prop)
        .then(swal.fire({
            icon: 'success',
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

    addWishlist = (prop) => {
        const { user } = this.props.auth0;
        return fetch("http://localhost:9000/sql?email=" + user.email + "&wishlist=" + prop)
        .catch( () => {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Sorry, error fetching data. Try again later.",
            })
        })
    }

    addLost = (prop) => {
        const { user } = this.props.auth0;
        return fetch("http://localhost:9000/sql?email=" + user.email + "&lost=" + prop)
        .catch( () => {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Sorry, error fetching data. Try again later.",
            })
        })
    }

    Clicked = (e) => {
        this.state.category = e;
        this.setState({loading:true})
        this.callAPI().then(() => {
        this.setState({loading:false})})
    }

    componentWillMount () {
    }

    render() {
        window.scrollTo(0, 0);
        const { isAuthenticated,isLoading } = this.props.auth0;
        if(this.state.category === "" && this.state.loading === false)
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                {this.print_table()}
            </div>
        )
        else if(this.state.category !== "" && this.state.loading === false){
            var children = [];
        this.state.items.forEach((item, i) => {
            children.push(<div key = {i} class="card border-primary mb-3" style={{"max-width": "50rem", "text-align":"left"}}> 
                <h4 class="card-header">scientific name: {item["scientific_name"]} 
                    <div style = {{"text-align":"right"}}>
                        <button class="btn btn-secondary" onClick = { () => this.addWishlist(item["scientific_name"])}><i class="fa fa-heart" aria-hidden="true"></i></button>
                        <button class="btn btn-secondary" onClick = { () => this.addOwned(item["scientific_name"])}><i class="fa fa-leaf" aria-hidden="true"></i></button>
                        <button class="btn btn-secondary" onClick = { () => this.addLost(item["scientific_name"])}><i class="fa fa-frown-o" aria-hidden="true"></i></button>
                    </div>
                </h4>
                <br/>
                <h4 class="card-body">common name: {item["common_name"]}</h4>
                <img src={item["image_url"]}></img> 
                </div>);
          });
            return (
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <div style={{"display": "grid", "justify-content": "center", "text-align":"center"}}>
                    <h1>{this.state.category}</h1>
                    <button class="btn btn-primary" onClick = {() => {this.setState({category:""})}} style={{"max-width": "10rem"}}>
                        return to list
                    </button>
                    
                    {children}
                    </div>
                    <br/>
                </div>
            );
        }
        else if(this.state.loading === true){
            return (
                <div>
                    loading...
                </div>
            )
        }
    }

    // render() {
    //     const { isAuthenticated,isLoading } = this.props.auth0;
    //     if(isAuthenticated && !isLoading) {
    //         return (
    //             <div>
    //                 <Header/>
    //                 <br/>
    //                 <br/>
    //                 {this.print_table()}
    //             </div>
    //         )
    //     }
    //     else if(!isAuthenticated && !isLoading) {
    //         return (
    //             <LoginButton/>
    //         )
    //     } 
    //     else {
    //         return (
    //             <p>loading...</p>
    //         )
    //     }
    // }

    print_table() {
        return(
        <table class="table table-hover" style={{"display": "grid", "justify-content": "center"}}>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Aeonium')} class="btn btn-primary">
                    <h2 class="text-light">
                        Aeonium
                    </h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Agave')} class="btn btn-primary">
                    <h2 class="text-light">Agave</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Aloe')} class="btn btn-primary">
                    <h2 class="text-light">Aloe</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Cotyledon')} class="btn btn-primary">
                    <h2 class="text-light">Cotyledon</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Crassula')} class="btn btn-primary">
                    <h2 class="text-light">Crassula</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Echeveria')} class="btn btn-primary">
                    <h2 class="text-light">Echeveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Cotyledon')} class="btn btn-primary">
                    <h2 class="text-light">Euphorbia</h2>
                    </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Gasteria')} class="btn btn-primary">
                    <h2 class="text-light">Gasteria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
            <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Graptopetalum')} class="btn btn-primary">
                    <h2 class="text-light">Graptopetalum</h2>
                </button>
            </td>
            <td>
            <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Graptoveria')} class="btn btn-primary">
                    <h2 class="text-light">Graptoveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Haworthia')} class="btn btn-primary">
                    <h2 class="text-light">Haworthia</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Kalanchoe')} class="btn btn-primary">
                    <h2 class="text-light">Kalanchoe</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Lithops')} class="btn btn-primary">
                    <h2 class="text-light">Lithops</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Othonna')} class="btn btn-primary">
                    <h2 class="text-light">Othonna</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Pachyphytum')} class="btn btn-primary">
                    <h2 class="text-light">Pachyphytum</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Pachypodium')} class="btn btn-primary">
                    <h2 class="text-light">Pachypodium</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Pachyveria')} class="btn btn-primary">
                    <h2 class="text-light">Pachyveria</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Peperomia')} class="btn btn-primary">
                    <h2 class="text-light">Peperomia</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Pedilanthus')} class="btn btn-primary">
                    <h2 class="text-light">Pedilanthus</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Portulacaria')} class="btn btn-primary">
                    <h2 class="text-light">Portulacaria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Sansevieria')} class="btn btn-primary">
                <h2 class="text-light">Sansevieria</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Sedeveria')} class="btn btn-primary">
                    <h2 class="text-light">Sedeveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Sedum')} class="btn btn-primary">
                    <h2 class="text-light">Sedum</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('CSenecio')} class="btn btn-primary">
                    <h2 class="text-light">Senecio</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Synadenium')} class="btn btn-primary">
                    <h2 class="text-light">Synadenium</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => this.Clicked('Titanopsis')} class="btn btn-primary">
                    <h2 class="text-light">Titanopsis</h2>
                </button>
            </td>
        </tr>
    </table>
    )
    }
}

export default withAuth0(Home);