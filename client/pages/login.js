import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import SignUp from '../components/SignUp';
import Account from '../components/Account';
import SignIn from '../components/SignIn';
import Layout from '../components/Layout';

export default function Login() {
    const [user, setUser] = useState("")
    const [click, setClick] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: ''
        })
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const userAgent = window.navigator.userAgent;
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    useEffect(() => {
        fetch("/api/me").then((r) => {
            if (r.ok) {r.json().then((data) => {
            setUser(data)});
            }});
        }, [setUser]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <Layout>
            <div className={`grid ${ isMobile ? "" : "grid-cols-3"} mt-32`}>
                <div className="col-span-2 bg-cover bg-auth w-full">
                    </div>
                <div className="bg-stone-100 h-full">
                    <div className={`${ isMobile ? "" : "ml-20"}`}>
                    {click == null ?
                        <div>
                        {user && (<div className="absolute top-0 left-0" style={{top: "50%", left: "33.33%", transform: "translate(-50%, -50%)", width: "50%", height: "50%"}}>
                            <div className="p-10 flex h-full w-full justify-center bg-white opacity-75 overflow-x-scroll">
                            </div>
                        </div>)}
                        <Account user={user} setClick={setClick} handleChange={handleChange} form={form}/>
                    </div>
                        : click==true?
                            <SignUp form={form} handleChange={handleChange} setClick={setClick}/>
                        :
                            <SignIn setClick={setClick}/>
                    }
                    </div>
                </div>
            </div>
        </Layout>
    );
}