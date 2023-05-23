export function Register() {
    return (
        <>
            <form className="form form-signup">
                <fieldset>
                    <legend>Please, enter your email, password and password confirmation for sign
                        up.
                    </legend>
                    <div className="input-block">
                        <label htmlFor="signup-email">Username</label>
                        <input id="signup-email" type="email" required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="signup-email">Name</label>
                        <input id="signup-email" type="email" required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="signup-email">Surname</label>
                        <input id="signup-email" type="email" required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="signup-password">Email</label>
                        <input id="signup-password" type="password" required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="signup-password-confirm">Password</label>
                        <input id="signup-password-confirm" type="password" required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="signup-password-confirm">Confirm password</label>
                        <input id="signup-password-confirm" type="password" required/>
                    </div>
                </fieldset>
                <button type="submit" className="btn-signup">Continue</button>
            </form>
        </>
    )
}