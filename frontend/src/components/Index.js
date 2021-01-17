import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

// UI Elements
import MainWrapper from './ui-elements/MainWrapper';
import PageWrapper from './ui-elements/PageWrapper';

// Components
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Footer from './Footer';

// Course Administration
import Dashboard from './Dashboard';
import Trash from './Trash';
import Room from './Room';

class Index extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isLoggedIn: false
        }

        // Set page display mode when loading
        this.loadingStyle = {display: "none"}
        this.loadedStyle = {display: ""}

        // Get current router path
    }
    
    componentDidMount() {

    }

    render() {
        // if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/logout"/>
        // const { path } = this.props.match;
        return (
            <MainWrapper>
                <div style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <Navbar />
                    <Sidebar />
                    <Switch>
                        <Route exact path="/"><Dashboard/></Route>
                        <Route exact path="/trash-bin"><Trash/></Route>
                        <Route path="/room/:id" component={Room}></Route>
                    </Switch>
                    <PageWrapper><Footer/></PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}
 
export default withRouter(Index);