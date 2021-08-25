import {useEffect, useState} from "react";
import styles from "./login.module.css"

const Auth = ({authorization}) => {

    const [userCredential, setUserCredential] = useState({
        email: '',
        first_name: '',
        password: '',
        error: ''
    })

    useEffect(() => {

    }, [userCredential])

    const setUserInfo = (e) => {
        setUserCredential((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        console.log(userCredential)
    }

    //send info to server
    const login = (e) => {
        e.preventDefault()
        fetch("/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: userCredential.email,
                    password: userCredential.password,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.errors) {
                    if (data.errors.error) {
                        setUserCredential((prev) => {
                            return {
                                ...prev,
                                error: data.errors.error
                            }
                        })
                    }
                } else {
                    authorization(data)
                }
            });
    }
    return (
        <div className={styles.loginForm}>
            <form className="auth-form" onChange={setUserInfo}>
                <input
                    key="email"
                    name="email"
                    placeholder="email"
                    required
                />
                <input
                    key="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                />
                <button type="submit"
                        className={styles.submitBtn}
                        onClick={login}>
                    Login
                </button>
                {userCredential.error ?
                    <p className={styles.error}>
                        {userCredential.error}
                    </p> : null}
            </form>
        </div>
    );
}

export default Auth;
