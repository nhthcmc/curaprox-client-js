import React from "react";
import api from '@services/apis'
import { Modal } from 'antd'

export default function Register({ containerRef }) {
    async function handleRegister(e) {
        e.preventDefault();
        try {
            let newUser = {
                userName: e.target.userName.value,
                password: e.target.password.value,
                email: e.target.email.value,
            }
            let result = await api.authen.register(newUser);
            Modal.info({
                title: "Please check your email to verify!",
                content: result.data.message,
                onOk: () => {
                    containerRef.current.classList.remove("right-panel-active");
                }
            })
        } catch (err) {
            Modal.error({
                title: 'Error',
                content: err.response.data.message
            })
        }
    }
    return (
        <div className="form-container sign-up-container">
            <form onSubmit={(e) => {
                handleRegister(e)
            }}>
                <h1 className="signUp">Sign Up</h1>
                {/* <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-google" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-github" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                </div> */}
                <span>Register with your email
                    <label>
                        <input required type="text" name="userName" placeholder="Name" />
                    </label>
                    <label>
                        <input required type="email" name="email" placeholder="Email" />
                    </label>
                    <label>
                        <input required type="password" name="password" placeholder="Password" />
                    </label>
                    <button type="submit" style={{ marginTop: '9px' }}>Sign Up</button>
                </span>
            </form>
        </div>
    )

}