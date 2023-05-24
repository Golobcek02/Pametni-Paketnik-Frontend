export function Register() {
    return (
        <>
            <form className="form form-signup">
                <fieldset>
                    <legend>Please enter your email, password, and password confirmation to sign up.</legend>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-username">Username</label>
                            <input id="signup-username" type="text" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-email">Email</label>
                            <input id="signup-email" type="email" required/>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-name">Name</label>
                            <input id="signup-name" type="text" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-surname">Surname</label>
                            <input id="signup-surname" type="text" required/>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-password">Password</label>
                            <input id="signup-password" type="password" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-password-confirm">Confirm password</label>
                            <input id="signup-password-confirm" type="password" required/>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn-signup">Continue</button>
            </form>
        </>
    );
}
