import React from 'react';
import Header from './header';

class About extends React.Component {
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
                    <h4>Here's some information about me and this website:</h4>
                    <p>
                        My name is Sharon and this is my website.
                    </p>
                </div>
            </div>
        )
    }
}

export default About;