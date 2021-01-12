import React, { Component } from 'react';

class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
    }
    render() { 
        return ( 
            <div>
                {this.props.history.push('/')}

            </div>
         );
    }
}
 
export default Logout;