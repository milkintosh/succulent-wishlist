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
                    <h4>Please let me know if you have any suggestions or issues here:</h4>
                </div>
            </div>
        )
    }
}

export default Contact;