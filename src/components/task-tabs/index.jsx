import React, { Component } from "react";
import GetComponent from '../../constants/tasks';
import "./index.scss";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;


export default class TaskTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: null,
            panes: []
        };
    }
    componentWillReceiveProps(nextProps) {
        let { tabs } = nextProps;
        let { panes, activeKey } = this.state;
        if (!panes.find(p => p.key === tabs.key)) {
            let CurrentComp = GetComponent(tabs.path);
            tabs.content = <CurrentComp />;
            panes.push(tabs);
        }
        console.log("task: 传给task tab了什么呢(componentWillReceiveProps)？", tabs);
        activeKey = tabs.key;
        this.setState({
            activeKey,
            panes
        });
    }
    onChange(activeKey) {
        this.setState({ activeKey }, () => {
            console.log("task：活跃key：", activeKey);
            this.props.sideActiveTab(this.state.panes.filter(c => c.key === activeKey)[0]);
        });
    }
    onEdit(targetKey, action) {
        this[action](targetKey);
    }

    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex, needSwitch;
        needSwitch = activeKey === targetKey;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey }, () => {
            needSwitch && this.props.sideActiveTab(panes[lastIndex >= 0 ? lastIndex : 0]);
        });
    }
    render() {
        let len = this.state.panes.length;
        let panes = this.state.panes.map(pane =>
            <TabPane tab={pane.name}
                key={pane.key}
                closable={len > 1}
            >
                {pane.content}
            </TabPane>);
        return (
            <Tabs
                hideAdd
                onChange={this.onChange.bind(this)}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit.bind(this)}
                style={{ width: (document.body.offsetWidth - 217) + "px" }}
            >
                {panes}
            </Tabs>);
    }
}