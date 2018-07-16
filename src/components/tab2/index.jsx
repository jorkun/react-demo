import React, { Component } from "react";
import "./index.scss";

class FormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
   
    render() {
        return (<div className="content">
            tab2
        </div>);
    }
}
const Tab2 = Form.create()(FormWrapper);
export default Tab2;