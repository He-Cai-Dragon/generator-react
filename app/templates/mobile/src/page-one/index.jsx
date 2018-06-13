import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { Button } from 'antd-mobile';
import {routerPath} from '../communal'

export default class Login extends Component {
	constructor(props) {
        super(props);
        this.state={
        	accountValue:"",
        	passwordValue:"",
        	isJumpy:false
        }
        this.onAccountChange=this.onAccountChange.bind(this);
        this.onPasswordChange=this.onPasswordChange.bind(this);
        this.onLoginClick=this.onLoginClick.bind(this);
    }
    /**
     * 在渲染前调用
     * @return {[type]} [description]
     */
    componentWillMount (){console.log("login>>>>componentWillMount");
    console.log("NODE_ENV>>>>"+NODE_ENV);console.log("PROJECT_PATH>>>>"+PROJECT_PATH);}
    /**
     *  在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构
     * @return {[type]} [description]
     */
    componentDidMount (){console.log("login>>>>componentDidMount")}
    /**
     * 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用
     * @return {[type]} [description]
     */
    componentWillReceiveProps (newProps){console.log("login>>>>componentWillReceiveProps")}
    /**
     * 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用
     * @return {[type]} [description]
     */
    shouldComponentUpdate (newProps, newState){return true;}
    /**
     * 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用
     * @return {[type]} [description]
     */
    componentWillUpdate(nextProps, nextState){}
    /**
     * 在组件完成更新后立即调用。在初始化时不会被调用
     * @return {[type]} [description]
     */
    componentDidUpdate(prevProps, prevState){}
    /**
     * 在组件从 DOM 中移除的时候立刻被调用
     * @return {[type]} [description]
     */
    componentWillUnmount(){console.log("login>>>>componentWillUnmount")}
    onAccountChange(e){
    	let value = e.traget.value;
    	this.setState({
    		accountValue: value
    	});

    }
    onPasswordChange(e){
    	let value = e.traget.value;
    	this.setState({
    		passwordValue: value
    	});
    }
    onLoginClick(){
    	this.props.history.push(routerPath+"/home")

    }
	render() {
		return(
			<div style={{textAlign: "center"}}>
				<input style={{width:"90%",marginLeft:"5%",marginTop:"20px",padding:"10px 0px"}} type="text" placeholder="请输入用户名" onChange={this.onAccountChange}/>
                <br/>
				<input style={{width:"90%",marginLeft:"5%",marginTop:"20px",padding:"10px 0px"}} type="password" placeholder="请输入密码" onChange={this.onPasswordChange}/>
				<Button type="primary" style={{width:"50%",marginLeft:"25%",marginTop:"15px"}}  onClick={this.onLoginClick}>登录</Button>
			</div>
		)
	}


}