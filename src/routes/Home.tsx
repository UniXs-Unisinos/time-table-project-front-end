//import UserProps from "../types/user";
import React from "react";
import LoginComponent from "../components/LoginComponent";
import LogoutButton from "../components/LogoutButtonComponent";
//import { useState } from "react";

/*
const [user, setUser] = useState<UserProps | null>(null);
    const loadUser = async(userName: string) => {
    const res = await fetch('/auth/login')
    const data = await res.json();
    console.log(data);*/ 
const Home = () =>{
    return (<div>
        <LoginComponent />
        <LogoutButton />
    </div>)
};

export default Home