import React from 'react';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

import Header from './header';
import API from './API'

class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {category:"", 
                    items:[{}],
                    pages:'',
                    loading:false,
                    user:this.props.auth0,
         };
    }

    
    render() {
        window.scrollTo(0, 0);
        if(this.state.category === "")
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                {this.print_table()}
            </div>
        )
        else if(this.state.category !== ""){

            return (
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <div style={{"display": "grid", "justify-content": "center", "textAlign":"center"}}>
                    <h1>{this.state.category}</h1>
                    <button class="btn btn-primary" onClick = {() => {this.setState({category:""})}} style={{"max-width": "10rem"}}>
                        return to list
                    </button>
                        <API key = {this.state.category} category={this.state.category}/>
                    </div>
                    <br/>
                </div>
            );
        }
    }

    print_table() {
        return(
        <table class="table" style={{"display": "grid", "justifyContent": "center"}}>
            <tbody>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Aeonium"})}} class="btn btn-primary">
                    <h2 class="text-light">
                        Aeonium
                    </h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Agave"})}} class="btn btn-primary">
                    <h2 class="text-light">Agave</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Aloe"})}} class="btn btn-primary">
                    <h2 class="text-light">Aloe</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Cotyledon"})}} class="btn btn-primary">
                    <h2 class="text-light">Cotyledon</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Crassula"})}} class="btn btn-primary">
                    <h2 class="text-light">Crassula</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Echeveria"})}} class="btn btn-primary">
                    <h2 class="text-light">Echeveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Gasteria"})}} class="btn btn-primary">
                    <h2 class="text-light">Gasteria</h2>
                    </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Graptopetalum"})}} class="btn btn-primary">
                    <h2 class="text-light">Graptopetalum</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
            <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Graptoveria"})}} class="btn btn-primary">
                    <h2 class="text-light">Graptoveria</h2>
                </button>
            </td>
            <td>
            <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Haworthia"})}} class="btn btn-primary">
                    <h2 class="text-light">Haworthia</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Kalanchoe"})}} class="btn btn-primary">
                    <h2 class="text-light">Kalanchoe</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Lithops"})}} class="btn btn-primary">
                    <h2 class="text-light">Lithops</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Othonna"})}} class="btn btn-primary">
                    <h2 class="text-light">Othonna</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Pachyphytum"})}} class="btn btn-primary">
                    <h2 class="text-light">Pachyphytum</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Pachypodium"})}} class="btn btn-primary">
                    <h2 class="text-light">Pachypodium</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Pachyveria"})}} class="btn btn-primary">
                    <h2 class="text-light">Pachyveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Peperomia"})}} class="btn btn-primary">
                    <h2 class="text-light">Peperomia</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Pedilanthus"})}} class="btn btn-primary">
                    <h2 class="text-light">Pedilanthus</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Portulacaria"})}} class="btn btn-primary">
                    <h2 class="text-light">Portulacaria</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Sanseveria"})}} class="btn btn-primary">
                    <h2 class="text-light">Sanseveria</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Sedeveria"})}} class="btn btn-primary">
                <h2 class="text-light">Sedeveria</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Sedum"})}} class="btn btn-primary">
                    <h2 class="text-light">Sedum</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Senecio"})}} class="btn btn-primary">
                    <h2 class="text-light">Senecio</h2>
                </button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Synadenium"})}} class="btn btn-primary">
                    <h2 class="text-light">Synadenium</h2>
                </button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} 
                onClick = {() => {this.setState({category:"Titanopsis"})}} class="btn btn-primary">
                    <h2 class="text-light">Titanopsis</h2>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
    )
    }
}

export default withAuth0(Home);