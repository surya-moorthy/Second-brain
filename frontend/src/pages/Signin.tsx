import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

export function Signin() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value ;
        if (!username || !password) {
            return (
                alert("Provide all the inputs")
            )
        }

        const userResponse = await axios.post(`${BACKEND_URL}/api/v1/user/login`,{
                
                    username : username,
                    password : password
                
        })
       if(userResponse) {
        const jwt = userResponse.data.token;
        localStorage.setItem("jwt",jwt);
        navigate("/dashboard")
       }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center  items-center">
           <div className="flex flex-col bg-white border border-gray-200 p-4 rounded-xl min-w-48">
                <Input placeholder="Username" ref={usernameRef}/>
                <Input placeholder="Password" ref={passwordRef}/>
                <div className="flex justify-center " onClick={signin}>
                <Button variant="primary" text="Signup"/>
                </div>
           </div>
        </div>
    )
}