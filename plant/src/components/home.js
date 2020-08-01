import React from 'react';
import {NavLink} from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";

import Header from './header';

class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};
    }
    
    render() {
        const { isAuthenticated,isLoading } = this.props.auth0;
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                {this.print_table()}
            </div>
        )
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
                <NavLink to = "/category/Aeonium">
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary">
                    <h2 class="text-light">
                        Aeonium
                    </h2>
                </button>
                </NavLink>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Agave</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Aloe</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Cotyledon</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Crassula</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Echeveria</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Euphorbia</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Gasteria</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Graptoptelatum</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Graptoveria</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Haworthia</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Kalanchoe</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Lithops</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Othonna</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Pachyphytum</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Pachypodium</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Pachyveria</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Peperomia</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Pedilanthus</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Portulacaria</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Sansevieria</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Sedeveria</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Sedum</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Senecio</h2></button>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Synadenium</h2></button>
            </td>
            <td>
                <button type="button" style={{"width": "20rem", "height": "10rem"}} class="btn btn-primary"><h2 class="text-light">Titanopsis</h2></button>
            </td>
        </tr>
    </table>
    )
    }
}

export default withAuth0(Home);