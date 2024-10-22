import React from "react";
import NewPassword from "../components/NewPasswordComponent";
import ForgotPassword from "../routes/ForgotPassword";


const Home = () =>{
    return (
    <div> <h1>home</h1>
        <p>esqueci a senha</p>
        <ForgotPassword/>
    </div>
        
);
};

export default Home