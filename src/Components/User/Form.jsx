import {useState} from "react";
import '../Home/home.css';
import {Login} from "./Login";
import {Register} from "./Register";

export function Form() {
    const [activeForm, setActiveForm] = useState("login");

    return (<section className="forms-section">
            <div className="forms">
                <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
                    <button
                        type="button"
                        className={`switcher switcher-login ${activeForm === 'login' ? 'is-active' : ''}`}
                        onClick={() => setActiveForm('login')}
                    >
                        Login
                        <span className="underline"></span>
                    </button>
                    <Login/>
                </div>
                <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
                    <button
                        type="button"
                        className={`switcher switcher-signup ${activeForm === 'signup' ? 'is-active' : ''}`}
                        onClick={() => setActiveForm('signup')}
                    >
                        Sign Up
                        <span className="underline"></span>
                    </button>
                    <Register/>
                </div>
            </div>
        </section>);
}
