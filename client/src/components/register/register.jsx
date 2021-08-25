import {useState} from "react";
import styles from "./register.module.css"
const Register = () => {

    const [user, setUser] = useState({
        email: '',
        first_name: '',
        password: ''
    })

    const setUserInfo = (e) => {
        setUser((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    //send info to server
    const register = (e) => {
        fetch("/register",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: user.email,
                    first_name: user.first_name,
                    password: user.password,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
            });
    }

    return (
        <div className={styles.registerForm}>
            <form className="form" onChange={setUserInfo}>
                <input
                    key="email"
                    name="email"
                    placeholder="email"
                    required
                />
                <input
                    key="first_name"
                    name="first_name"
                    placeholder="name or login"
                    required
                />
                <input
                    key="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                />
                <button className={styles.submitBtn}
                        type="submit"
                        onClick={register}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;