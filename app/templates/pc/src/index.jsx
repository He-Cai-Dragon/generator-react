import React from 'react';
import ReactDom from 'react-dom';
import AppRouter from './router'
import "./style/index.css"
import "../theme/index.css"



ReactDom.render(<AppRouter/>, document.getElementById('index'));