import "./css/loginpage.css"
import { useState } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import GoogleLogin from "react-google-login";

function LoginPage() {

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

    
    return (
        <>
            <div className="login-container">
            <br/>
                <h1>Welcome !</h1>
                <p>Please Login using your Google Account</p>
                <br/>
                <form id="login-form">
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
                    <br/><br/>
                </form>
            </div>
        </>
    )
}

export default LoginPage