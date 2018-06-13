import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {maxWidth,minHeight,enterRouterPath,routerPath} from "../communal"
import Error from '../error-page'
import Login from '../page-one'
import Home from '../page-two'

export default class AppRouter extends Component {
	render() {
		return(
			<Router>
				<div className="am-container" style={{minHeight:minHeight,maxWidth:maxWidth}}>
					<Switch>
						<Route exact path={enterRouterPath} component={Login}/>
						<Route path={routerPath+"/home"} component={Home}/>
						{/**<Route component={Login} />**/}
					</Switch>
				</div>
			</Router>
		)
	}


}