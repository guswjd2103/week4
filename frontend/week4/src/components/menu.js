import React, {Component} from 'react';
import {File} from '../routes';
import { connect } from 'react-redux';

class Menu extends Component {

    render() {
        return (
            <div>
                <File />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
    };
};

export default connect(mapStateToProps, null)(Menu);