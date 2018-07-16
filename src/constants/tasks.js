import React from "react";
import Loadable from 'react-loadable';
import { Icon, Button } from "antd";
/**
import { Loadable } from 'react-loadable';
 * 配置多任务：任务路径对应相应组件
 */
function Loading(props) {
    if (props.error || props.timedOut) {
        return <div style={{ "textAlign": "center",color: "red" }}>
            <p>加载{props.error ? "出错" : "超时"}！</p>
            <Button onClick={props.retry} type="primary">重新加载</Button>
        </div>;
    } else if (props.pastDelay) {
        return <div className="task-loading-wrapper"><Icon type="loading" /> </div>;
    }
    return null;
}
export default function (path) {
    let component = null;
    switch (path) {
        case "tab1":
            component = Loadable({
                loader: () => import("components/tab1/index"),
                loading: Loading
            });
            break;
        case "tab2":
            component = Loadable({
                loader: () => import("components/tab2/index"),
                loading: Loading
            });
            break;
        case "tab3":
            component = Loadable({
                loader: () => import("components/tab3/index"),
                loading: Loading
            });
            break;
        default:
            break;
    }
    return component;
}