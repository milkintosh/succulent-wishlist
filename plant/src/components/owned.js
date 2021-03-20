import React from 'react';
import Header from './header';
import swal from 'sweetalert2';
import { withAuth0 } from "@auth0/auth0-react";

import Getuser from './getuser';
import LoginButton from './login';

class Collection extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            light:0,
            water:0,
            dormancy:"",
            hardiness:"",
            user:[],
            filtered:false,
            sorted:false,
                    };
    }

    select = ({target}) => {
        this.setState({[target.name]:target.value})
    }

    reset = () => {
        this.setState({light:0,water:0,dormancy:"",hardiness:"",filtered:false})
    }

    callFilteredAPI = () => {
        const { user, isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
            return fetch("http://localhost:9000/sql?email="+user.email+"&light="+this.state.light+"&water="+this.state.water+"&dormancy="+this.state.dormancy+"&hardiness="+this.state.hardiness+"&filtered=true") 
            .then(res => res.json())
            .then(res => this.setState({user : res, filtered:true}))
            .catch( () => {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Sorry, error fetching data. Try again later.",
                })
            });
        }
    }

    callSortedAPI = ({target}) => {
        const { user, isAuthenticated, isLoading } = this.props.auth0;
        var url;
        if(target.value==='light') 
            url="http://localhost:9000/sql?email="+user.email+"&light=1&sorted=true"
        else if(target.value==='light desc')
            url="http://localhost:9000/sql?email="+user.email+"&light=1&desc=true&sorted=true"
        else if(target.value==='water')
            url="http://localhost:9000/sql?email="+user.email+"&water=1&sorted=true"
            else if(target.value==='water desc')
            url="http://localhost:9000/sql?email="+user.email+"&water=1&desc=true&sorted=true"
        if(isAuthenticated && !isLoading) {
            return fetch(url) 
            .then(res => res.json())
            .then(res => this.setState({user : res, sorted:true}))
            .catch( () => {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Sorry, error fetching data. Try again later.",
                })
            });
        }
    }

    render() {
        const {isAuthenticated, isLoading } = this.props.auth0;
        if(isAuthenticated && !isLoading) {
            if(this.state.filtered || this.state.sorted) {
                var owned=[];
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
                    owned.push(<div class="card border-primary mb-3" style={{"width": "50rem", "height":"15rem","text-align":"left"}}> 
                                <div class="card-header" style = {{"text-align":"right"}}>
                                <button title = "remove" class = "btn btn-outline-danger" onClick = {() => this.removePlant(item['name'])}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                                <div class="card-body">
                                <h4 class="card-title">{item['name']} </h4>
                                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fab fa-centos"></i>Light: {light}</h6>
                                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-hand-holding-water"></i>Water: {water}</h6>
                                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="fas fa-bed"></i>Dormancy Period: {item['dormancy']}</h6>
                                <h6 class="card-text"><i style={{"display":"inline-block", "width":"30px"}} class="far fa-snowflake"></i>Hardiness: {item['hardiness']}</h6>
                                </div>
                                <br/>
                                </div>)
                });
            }
            return (
                <div>
                    <Header/>
                    <br/>
                    <br/>

                    <div style={{"width":"100%", "textAlign":"center"}}>
                        <div class="card border-primary mb-3" style={{"width":"30rem", "height":"15rem", "float":"left", "marginLeft": "25%", "transform": "translateX(50%)"}}>
                            <div>
                            <h4 class="card-body" style={{"display": "inline-block", "justifyContent": "center","clear":"both"}}>
                            Filter By:
                            </h4>
                            <button class="btn btn-link" style={{"float":"left"}} onClick={() => this.reset()}>
                                <i class="fas fa-redo-alt"></i>
                            </button>
                            </div>
                            <table>
                                <tbody>
                                <tr style={{"display": "inline-block", "justifyContent": "center"}}>
                                    <td>
                                        <div class="form-group" style={{"width":"10rem"}}>
                                            <select name="light" onChange={this.select} value={this.state.light} class="custom-select"> 
                                                <option selected={0}>Light:</option>
                                                <option value={1}>full shade to bright light</option>
                                                <option value={2}>partial shade to partial sun</option>
                                                <option value={3}>full sun to partial shade</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group" style={{"width":"10rem"}}>
                                            <select name="water" onChange={this.select} value={this.state.water} class="custom-select"> 
                                                <option selected={0}>Water:</option>
                                                <option value={1}>less than your average succulent</option>
                                                <option value={2}>average for a succulent</option>
                                                <option value={3}>more than your average succulent</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{"display": "inline-block", "justifyContent": "center"}}>
                                    <td>
                                        <div class="form-group" style={{"width":"10rem"}}>
                                            <select name="dormancy" onChange={this.select} value={this.state.dormancy} class="custom-select"> 
                                                <option selected="">Dormancy:</option>
                                                <option value="summer">summer</option>
                                                <option value="winter">winter</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group" style={{"width":"10rem"}}>
                                            <select name="hardiness" onChange={this.select} value={this.state.hardiness} class="custom-select"> 
                                                <option selected="">Hardiness:</option>
                                                <option value="5b-9b">5b-9b</option>
                                                <option value="8a-10b">8a-10b</option>
                                                <option value="8a-11b">8a-11b</option>
                                                <option value="8b-10b">8b-10b</option>
                                                <option value="9a-10b">9a-10b</option>
                                                <option value="9a-11b">9a-11b</option>
                                                <option value="9b-10b">9b-10b</option>
                                                <option value="9b-11b">9b-11b</option>
                                                <option value="10a-11b">10a-11b</option>
                                                <option value="10b-11b">10b-11b</option>
                                                <option value="11a-11b">11a-11b</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button class = "btn btn-outline-secondary" style={{"marginBottom":"1rem"}} onClick={() => this.callFilteredAPI()}>
                                            submit
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    
                        <div class="form-group" style={{"width":"10rem", "float":"left", "transform": "translateY(-100%)","marginTop":"15rem", "marginLeft": "20rem"}}>
                            <select name="sorted" value={this.state.sort} class="custom-select" onChange={this.callSortedAPI}> 
                            <option selected="">Sort By:</option>
                            <option value="light">light ascending</option>
                            <option value="light desc">light descending</option>
                            <option value="water">water ascending</option>
                            <option value="water desc">water descending</option>
                            </select>
                        </div>
                    </div>

                    <br/>
                    <br/>

                    <div style={{"display": "grid", "justifyContent": "center", "text-align":"center", "clear":"both"}}>
                        <h2>Owned</h2>
                        <br/><br/>

                        {this.state.filtered || this.state.sorted ?
                        owned :
                        <Getuser owned={true}/>}

                    </div>
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

export default withAuth0(Collection);