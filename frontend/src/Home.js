import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                   ....home...
                </Container>
            </div>
        );
    }
}
export default Home;
