import React, { useRef } from 'react'
import './authen.scss'
import Register from './components/Register'
import Login from './components/Login'

export default function Authen() {
    const containerRef = useRef();
    return (
        <body>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <section>
                <div ref={containerRef} className="container" id="container">
                    <Register containerRef={containerRef} />
                    <Login />
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Log in</h1>
                                <p>Welcome back </p>
                                <button onClick={() => {
                                    containerRef.current.classList.remove('right-panel-active');
                                }}
                                    className="ghost mt-5" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Create Account</h1>
                                <p>Join with us</p>
                                <button onClick={() => {
                                    containerRef.current.classList.add('right-panel-active');
                                }}
                                    className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}
