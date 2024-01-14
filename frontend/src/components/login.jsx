import "./css/loginpage.css"
import Cookies from 'js-cookie';
import GoogleLogin from "react-google-login";
import axios from "axios";

function LoginPage() {

    const client_id = "463364694212-9sunroepoi627r4p98o8i67nl4c7f24p.apps.googleusercontent.com";

    async function onSuccess(res) {
        const username = res.profileObj.givenName + " " + res.profileObj.familyName;
        const email = res.profileObj.email;
        const profile_url = res.profileObj.imageUrl;
        Cookies.set('profile_picture', profile_url, { expires: 7 });
        Cookies.set('profile_username', email, { expires: 7 });
        Cookies.set('profile_name', username, { expires: 7 });
        Cookies.set('logged_in', 'user');
        const reqData = {
            username: username,
            email: email,
            profile_url: profile_url
        }
        console.log(reqData)
        const response = await axios.post("http://localhost:4000/api/users/addUser", reqData);
        location.href = "/"
    }

    function onFailure(res) {
        console.log("Failed: " + res)
    }


    return (
        <>
            <div className="login-container">
                <br />
                <h1>Welcome !</h1>
                <p>Please Login using your Google Account</p>
                <br />
                <form id="login-form">
                    <div id="signInDiv">
                        <GoogleLogin
                            className="google-login-button"
                            clientId={client_id}
                            buttonText="Continue with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy="single_host_origin"
                            isSignedIn={false}
                        />
                    </div>
                    <br /><br />
                </form>
            </div>
        </>
    )
}

export default LoginPage