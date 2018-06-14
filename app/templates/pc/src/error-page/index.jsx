import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

export default class Error extends Component {
	render() {
		let mHeight = document.documentElement.clientHeight ;
		return(
			<div>
				<img src={require("../images/error_page_bg.jpg")} width="100%" height={mHeight} alt=""/>
			</div>
		)
	}


}