//import UserProps from "../types/user";
import React from "react";
import LoginComponent from "../components/LoginComponent";
//import { useState } from "react";

/*
const [user, setUser] = useState<UserProps | null>(null);
    const loadUser = async(userName: string) => {
    const res = await fetch('/auth/login')
    const data = await res.json();
    console.log(data);*/ 
const Home = () =>{
    return <div>
        <LoginComponent />
    </div>
    
};

export default Home