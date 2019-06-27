import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {onRegisterUser} from '../actions'

class Register extends Component {


    onRegistertClick = () => {
        const user = this.username.value
        const namad = this.nama_depan.value
        const namab = this.nama_belakang.value
        const email = this.email.value
        const pass = this.password.value
        console.log(`RegistertClick`);
        this.props.onRegisterUser(user,namad,namab,email,pass)
    }

    onErrorRegister = () => {
        if(this.props.error !== ''){
            return (
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        } else if (this.props.success !== ''){
            return (
                <div className="alert alert-success mt-4">
                    {this.props.success}
                </div>
        )}else {
            return null
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="mt-5 row">
                        <div className="col-sm-3 mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Register</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Username</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.username = input}} className="form-control" type="text"/>
                                </form>
                                <div className="card-title mt-1">
                                    <h4>Nama Depan</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.nama_depan = input}} className="form-control" type="text"/>
                                </form>
                                <div className="card-title mt-1">
                                    <h4>Nama Belakang</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.nama_belakang = input}} className="form-control" type="text"/>
                                </form>
                                <div className="card-title mt-1">
                                    <h4>Email</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.email = input}} className="form-control" type="email"/>
                                </form>
                                <div className="card-title mt-1">
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.password = input}}  className="form-control" type="password"/>
                                </form>
                                <button className="btn btn-success btn-block mt-5" 
                                    onClick={this.onRegistertClick}>Register</button>
                                    {this.onErrorRegister()}
                                   
                                <p className="lead">Do you have account ? <Link to="/login">Sign In!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {error: state.auth.error, success:state.auth.success}
}

export default connect(mapStateToProps,{onRegisterUser})(Register)