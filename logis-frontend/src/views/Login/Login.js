import React, { useCallback, useState } from 'react'
import { Button } from '@material-ui/core';
import { notifier } from './../../helpers'
import { useHistory } from 'react-router-dom';

import { loginProxy } from '../../api'
import { readyException } from 'jquery';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                userName: "nghiacrom",
                password: "123456"
            }
        }

    }

    updateField = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    }


    // {
    //     "userName" : "nghiacrom1",
    //     "password" : 123456
    // }


    loginSubmit = () => {
        //handle login
        if (!this.state.form.userName || !this.state.form.password) {
            this.showErrorModal()
            return
        }

        let scope = this
        loginProxy(this.state.form,
            data => {
                let userClaims = data.data
                if (!userClaims) {
                    notifier.showErrorMessage("Không tìm thấy thông tin người dùng")
                    return
                }
                localStorage.setItem("User", JSON.stringify(userClaims))
                console.log(data.data)
                scope.navigateToHome()
            },
            err => {
                scope.showErrorModal()
                throw err
            })
        // go to home

    };

    navigateToHome() {
        this.props.history.push('/bill')
    }


    showErrorModal = () => {
        notifier.showErrorMessage("Tên đăng nhập hoặc mật khẩu không hợp lệ")
    }

    // css
    loginTitle = {
        textAlign: 'center',
        marginBottom: '65px'
    }

    render() {
        return (
            <div className="d-flex login-bg">
                <div className="login-container">
                    <h3 style={this.loginTitle}>Logistic App</h3>
                    <form noValidate autoComplete="off">
                        <div className="form-group">
                            <label>Tên đăng nhập</label>
                            <input className="form-control" name="userName" value={this.state.form.userName} onChange={this.updateField} />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input className="form-control" name="password" type="password" value={this.state.form.password} onChange={this.updateField} />
                        </div>
                        <Button variant="contained" color="primary" onClick={this.loginSubmit}>
                            Đăng nhập
                    </Button>
                        <section className="signup-section">
                            <span> <a href="/">Đăng ký ngay</a></span>
                            <span> <a href="/">Quên mật khẩu?</a></span>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}