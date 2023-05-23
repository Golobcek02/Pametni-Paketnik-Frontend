import {useEffect} from "react";
import '../Home/home.css';
import {Login} from "./Login";
import {Register} from "./Register";

export function Form() {

    useEffect(() => {
        const switchers = [...document.querySelectorAll('.switcher')];

        switchers.forEach((item) => {
            item.addEventListener('click', function () {
                switchers.forEach((item) => item.parentElement.classList.remove('is-active'));
                this.parentElement.classList.add('is-active');
            });
        });

        return () => {
            switchers.forEach((item) => {
                item.removeEventListener('click', function () {
                    switchers.forEach((item) => item.parentElement.classList.remove('is-active'));
                    this.parentElement.classList.add('is-active');
                });
            });
        };
    }, []);

    return (
        <section className="forms-section">
            <div className="forms">
                <div className="form-wrapper is-active">
                    <button type="button" className="switcher switcher-login">
                        Login
                        <span className="underline"></span>
                    </button>
                    <Login/>
                </div>
                <div className="form-wrapper">
                    <button type="button" className="switcher switcher-signup">
                        Sign Up
                        <span className="underline"></span>
                    </button>
                    <Register/>
                </div>
            </div>
        </section>)
}