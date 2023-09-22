import "./css/loginpage.css"
import { useState } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import GoogleLogin from "react-google-login";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const client_id = "463364694212-9sunroepoi627r4p98o8i67nl4c7f24p.apps.googleusercontent.com";

    function onSuccess(res) {
        Cookies.set('profile_picture', res.profileObj.imageUrl, { expires: 7 });
        Cookies.set('profile_username', res.profileObj.email, { expires: 7 });
        Cookies.set('profile_name', res.profileObj.givenName +" "+res.profileObj.familyName , { expires: 7 });
        location.href = "/"
    }

    function onFailure(res) {
        console.log("Failed: " + res)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = axios.post('http://localhost:4000/api/users/checkUser', {
            username,
            password
        })
            .then(async (response) => {
                if (response.status == 200) {
                    alert("User exists");
                    setUsername('');
                    setPassword('');
                    setErrorMsg(null);
                }
            })
            .catch(error => {
                setErrorMsg("Login credintials are wrong!")
            });
    }

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <h3>{errorMsg}</h3>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text"
                            id="username"
                            name="username"
                            onChange={(e) => { setUsername(e.target.value) }}
                            value={username}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                    <div id="signInDiv">
                        <GoogleLogin
                            clientId={client_id}
                            buttonText="Continue with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy="single_host_origin"
                            isSignedIn={false}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage