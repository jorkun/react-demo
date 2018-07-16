import React, { Component } from "react";
import Sidebar from './../sidebar/index';
import Header from './../header/index';

import "./index.scss";
import TaskTabs from "components/task-tabs/index"

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            task: {}
        };
    }
    setActiveTab(task) {
        this.setState({
            task
        });
    }
    render() {
        return (
            <div className="dashboard">
                <Header userName="系统管理员" />
                <div className="right">
                    <Sidebar
                        activeTab={this.setActiveTab.bind(this)} activeKey={this.state.task}
                    />
                    <div className="task-list">
                        <TaskTabs tabs={this.state.task} sideActiveTab={this.setActiveTab.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}