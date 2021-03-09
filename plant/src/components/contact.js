import React from 'react';
import Header from './header';

class Contact extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                <div style={{"text-align": "center"}}>
                    <label><h4>Please let me know if you have any suggestions or issues here:<br/></h4>
                    (This means changing light requirements of a plant from 2 to 3, adding a specific plant with light, water, etc. specified. <br/>
                    Adding a source or reasoning is ideal.)</label>
                    <br/>
                    <textarea style = {{"width":"500px","height":"200px"}}></textarea>
                    <br/>
                    <br/>
                    <button class="btn btn-primary">submit</button>
                </div>
            </div>
        )
    }
}

export default Contact;