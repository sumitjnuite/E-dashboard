import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // see in privateComponent why we used ----
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const userData = async() =>{
        let result = await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({name,email,password}),
            headers:{
                'content-type':'application/json'
            }
        })

        result = await result.json();
        console.log(result)
        localStorage.setItem('user',JSON.stringify(result));
        navigate('/');
        
    }

    return (
        <div>
            <h1 className='registerHeading'>Register</h1>

            <input
                className='inputBox'
                type="text"
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input
                className='inputBox'
                type="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button className='signupbtn' type='button' onClick={userData}>SignUp</button>
        </div>
    )
}

export default Signup
