import React, { Component } from "react";
import { Link } from "react-router";
import "./index.scss";

import { Menu, Dropdown, Icon } from "antd";

export default class Header extends Component {
    render() {
        const { userName } = this.props;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/login">退出</Link>
                </Menu.Item>
            </Menu>
        );
        return (<div className="header">
            <div className="logo">
                XXXXX管理系统
            </div>
            <div className="right">
                <img src={require("resources/images/avatar.svg")} alt="头像" />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                        {userName} <Icon type="caret-down" />
                    </a>
                </Dropdown>
            </div>
        </div>);
    }
}