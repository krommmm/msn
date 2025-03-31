export function SignIn({ onUpdate }) {

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = {
            email: form.elements['email'].value,
            password: form.elements['password'].value,
            // isSaveEmail: form.elements['choix1'].checked,
            // isavePassword: form.elements['choix2'].checked,
            // isAutoSign: form.elements['choix3'].checked,
        }
        onUpdate(data);
        form.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <div>
                    <label>E-mail address:</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" />
                </div>
            </div>
            <div className="checkbox">
                <div>
                    <input type="checkbox" id="rememberEmail" name="choix1" value="option1" />
                    <label htmlFor="remeberEmail">Remember Me</label>
                </div>
                <div>
                    <input type="checkbox" id="rememberPassword" name="choix2" value="option2" />
                    <label>Remember my Password</label>
                </div>
                <div>
                    <input type="checkbox" id="saveMe" name="choix3" value="option3" />
                    <label>Sign me in automatically</label>
                </div>
            </div>
            <div className="button-container">
                <button type="submit">Sign In</button>
            </div>
        </form>
    );
}