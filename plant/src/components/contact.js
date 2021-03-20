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
                    (Note: I did create my own database, so I may have gotten some things wrong. Please correct me with a source if there are any changes I need to make.)</label>
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