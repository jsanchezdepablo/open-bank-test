import React, {Component} from "react";

import success from './success.png';
import error from './error.png'

class Step3 extends Component {
    render() {
        return <img src={this.props.success ? success : error}/>
    }
}

export default Step3;