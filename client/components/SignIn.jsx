import React, {useContext, useState} from "react"
import { useRouter } from "next/router"
import Link from 'next/link';
import UserContext from "../contexts/UserContext";


export default function SignIn({ setClick }) {
    const [user, setUser] = useContext(UserContext)
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        email: '',
        password: '',
        })

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        fetch('/api/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(res => {
            if(res.ok) {
                res.json().then((user) => setUser(user)).then(router.push('/instrumentals'))
            } else {
                res.json().then((error) => setErrors(error.errors))
            }
        })
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const act = "Don't have an account?"


    return (
        <div className="h-screen">
            <h1 className="grid grid-cols-2 font-bold text-4xl pb-2 pt-40">
                Sign In
            </h1>
            <div className='py-5 mr-10'>
                <form onSubmit={handleSubmit} className="w-96 justify-center pb-2">
                    <input onChange={handleChange} className="inline-flex w-[380px] h-14 bg-white mb-4 px-4 py-2 text-base items-center text-left font-normal shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="username" type="text" placeholder="Email Address" name="email" value={form.email}/>
                    <input onChange={handleChange} className="inline-flex w-[380px] h-14 bg-white mb-4 px-4 py-2 text-base items-center text-left font-normal shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="username" placeholder="Password" type="password" name="password" value={form.password}/>
                    <div className="items-center mt-2 w-[400px]">
                        <button className='w-[380px] bg-black rounded-full text-white text-base font-medium m-2 py-3 px-10 mb-5 mt-5'>Enter</button>
                        <h1>{errors}</h1>
                        <p className="text-center">{act} <button onClick={() => setClick(true)}><em className="font-medium underline not-italic">Create one</em></button></p>
                    </div>
                </form>
            </div>
        </div>
    )
}