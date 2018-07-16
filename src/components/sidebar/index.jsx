import React, { Component } from "react";
import "./index.scss";

import { Menu, Icon } from 'antd';
import instance from 'utils/instance';
const SubMenu = Menu.SubMenu;

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            menuData: [],
            currentKey: null,
            openKeys: []
        };
    }
    async componentWillMount() {
        try {
            let response = await instance.get("menu");
            let data = { response };
            this.setState({
                menuData: data
            });
        } catch (error) {
            let menuData = [{
                key: "common",
                name: "最高级菜单",
                children: [{
                    key: "tab",
                    name: "第二级菜单",
                    path: "",
                    children: [{
                        key: "tab1",
                        name: "选项一",
                        path: "tab1"
                    }, {
                        key: "tab2",
                        name: "选项二",
                        path: "tab2"
                    }]
                }, {
                    key: "tab3",
                    name: "选项三",
                    path: "tab3"
                }]
            }];
            let currentKey = this.getPlainArr(menuData)[0].path;
            await this.setState({
                menuData,
                currentKey,
                openKeys: this.getParentsKey(menuData, currentKey)
            }, this.initTabComponent)
            console.log(error);
        }
    }
    componentWillReceiveProps(nextProps) {
        let { activeKey } = nextProps;
        console.log("sidebar componentWillReceiveProps 传递", nextProps)
        this.setState({
            currentKey: activeKey.key
        });
    }
    initTabComponent() {
        this.props.activeTab(this.getPlainArr(this.state.menuData)[0]);
    }
    getParentsKey(list, key) {
        let nodeList = [];
        list.map(c => {
            if (typeof c.children === "object") {
                c.children.map(c1 => {
                    if (typeof c1.children === "object") {
                        c1.children.map(c2 => {
                            if (!c2.children && c2.key === key) {
                                nodeList = [c.key, c1.key, c2.key];
                            }
                            return [];
                        })
                    } else if (c1.key === key) {
                        nodeList = [c.key, c1.key];
                    }
                    return [];
                })
            } else if (c.key === key) {
                nodeList = [c.key];
            }
            return [];
        });
        console.log(nodeList, key)
        return nodeList;
    }
    // 平铺嵌套对象
    getPlainArr(dataList) {
        let newArr = [];
        dataList.map(c => {
            if (typeof c.children === "object") {
                newArr.push.apply(newArr, this.getPlainArr(c.children));
            } else {
                newArr.push(c);
            }
            return true;
        });
        return newArr;
    }
    handleMenuClick(menu) {
        console.log("sidebar handleMenuClick选择", menu);
        let component = menu.item.props.component;
        console.log("sidebar 组件", component);
        this.setState({
            currentKey: menu.key
        }, () => {
            this.props.activeTab(component);
        });
    }
    handleOpenChange(openKeys) {
        console.log("sidebar handleOpenChange打开了谁？", openKeys);
        this.setState({
            openKeys
        });
    }
    render() {
        const { menuData } = this.state;
        const menuDom = menuData.map((it) => {
            if (it.path) {
                return <Menu.Item key={it.path} component={it}>{it.name}</Menu.Item>
            } else {
                return <SubMenu key={it.key} title={<span><Icon type="setting" /><span>{it.name}</span></span>}>
                    {it.children.map((its) => {
                        if (its.path) {
                            return <Menu.Item key={its.key} component={its}>{its.name}</Menu.Item>
                        } else {
                            return <SubMenu key={its.key} title={its.name}>
                                {its.children.map((its3) => {
                                    if (its3.path) {
                                        return <Menu.Item key={its3.key} component={its3}>{its3.name}</Menu.Item>
                                    }
                                    return null;
                                })}
                            </SubMenu >
                        }
                    })}
                </SubMenu>
            }
        });
        return (<aside className="sidebar">
            <Menu
                onOpenChange={this.handleOpenChange.bind(this)}
                onClick={this.handleMenuClick.bind(this)}
                defaultOpenKeys={this.state.openKeys}
                defaultSelectedKeys={[this.state.currentKey]}
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.currentKey]}
                theme="dark"
                mode="inline">
                {menuDom}
            </Menu>
        </aside>);
    }
}