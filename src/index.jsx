import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import MasterMobileComponent from './common/main.component.jsx'
import Mobile from './Mobile/mobile.component.jsx'
import MobileCompare from './Mobile/mobile-compare.component.jsx'
import mockData from './common/mockdata.json'

const data = mockData;

render(
    <Router history={browserHistory}>
        <Route path="/" component={MasterMobileComponent} data={data}>
            <IndexRoute component={Mobile} data={data}/>
            <Route path="/mobiles?mobileSku" component={MobileCompare} data={data}/>
        </Route>
    </Router>,
    document.getElementById('container')
);
