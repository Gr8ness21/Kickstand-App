import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div>
                <div className="navBar">
                    <Link to={'/'}> Home </Link>
                    <Link to={'/cities'}> Cities </Link>
                    <Link to={'/shop'}> Shop </Link>
                </div>
            </div>
        );
    }
}

export default Nav;