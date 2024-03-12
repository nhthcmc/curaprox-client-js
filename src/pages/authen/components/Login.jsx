import React, { useState } from "react";
import api from '@services/apis'
import { Modal } from "antd";
import { loginWithGoogle } from '@services/firebase'

export default function Login() {
    const [load, setLoad] = useState(false);
    async function handleLogin(e) {
        e.preventDefault();
        try {
            let data = {
                loginId: e.target.loginId.value,
                password: e.target.password.value
            }
            let result = await api.authen.login(data)
            localStorage.setItem('token', result.data.token)
            Modal.success({
                title: "Welcome",
                content: result.data.message,
                onOk: () => {
                    window.location.href = "/"
                }
            })
        } catch (err) {
            Modal.error({
                title: "Error",
                content: err.response.data.message,
            })
        }
    }
    async function handleLoginWithGoogle() {
        try {
            let result = await loginWithGoogle();
            let data = {
                googleToken: result.user.accessToken,
                user: {
                    email: result.user.email,
                    avatar: result.user.photoURL,
                    userName: String(Math.ceil(Date.now() * Math.random())),
                    password: String(Math.ceil(Date.now() * Math.random()))
                }
            }
            let resultApi = await api.authen.loginWithGoogle(data);
            localStorage.setItem("token", resultApi.data.token)
            Modal.success({
                title: "Welcome",
                content: resultApi.data.message,
                onOk: () => {
                    window.location.href = "/"
                }
            })
        } catch (err) {
            Modal.error({
                title: "Error",
                content: err.response ? err.response.data.message : "Unknown error"
            })
        }
    }
    return (
        <div className="form-container sign-in-container">
            <form onSubmit={(e) => {
                handleLogin(e)
            }}>
                <h1 className="signIn">Sign in</h1>
                <div className="social-container">
                    <span>with</span>
                    <a style={{ cursor: "pointer" }} onClick={() => {
                        handleLoginWithGoogle()
                    }} className="social"> <i className="fab fa-google"></i>
                    </a>
                    {/* <a href="#" className="social"> <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="social"> <i className="fab fa-facebook-f"></i>
                    </a> */}
                </div>
                <span>or with your email</span>
                <label>
                    <input type="text" name="loginId" placeholder="Email" />
                </label>
                <label>
                    <input type="password" name="password" placeholder="Password" />
                </label>
                <a href="#">Forgot your password</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}