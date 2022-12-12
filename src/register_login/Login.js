import React, { useRef, useState, useEffect, useContext } from 'react';
import './RegisterLogin.css';
import { Button } from 'react-bootstrap';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var profiles = await fetch(`http://localhost:8000/userProfiles`).then(res => {
                return res.json();
            });
            var matchedNameProfiles = profiles.filter(profile => profile.name === user);
            if (matchedNameProfiles.length === 0) {
                setErrMsg('Invalid username and password combination');
                errRef.current.focus();
                return;
            }
            var matchedPwdProfiles = matchedNameProfiles.filter(profile => profile.pwd === pwd);
            if (matchedPwdProfiles.length === 0) {
                setErrMsg('Invalid username and password combination');
                errRef.current.focus();
                return;
            }
            // TODO: login user
            console.log(matchedPwdProfiles[0]);
            setSuccess(true);

        } catch (err) {
            setErrMsg('Invalid failed');
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <Button type='submit'>Login</Button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Register</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login