/**
 * @file Main
 * @copyright Copyright (c) 2018 Dylan Miller, Todd Kitchens and dfinityexplorer contributors
 * @license MIT License
 */
 
import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from './Home';
import AccountsPage from './AccountsPage';
import BlocksPage from './BlocksPage';
import ContractsPage from './ContractsPage';
import TransactionsPage from './TransactionsPage';
import DEAppBar from './Components/DEAppBar/DEAppBar';
import Footer from './Components/Footer/Footer';
/**
 * Top-level component of the app.
 */
class Main extends Component {
render() {
    return (
      <HashRouter>
        <div>
          <DEAppBar />
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/AccountsPage" component={AccountsPage}/>
            <Route path="/BlocksPage" component={BlocksPage}/>
            <Route path="/ContractsPage" component={ContractsPage}/>
            <Route path="/TransactionsPage" component={TransactionsPage}/>
          </div>
         < Footer />
        </div>
      </HashRouter>
    );
}
}

export default Main;
