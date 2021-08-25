import App from "./App";
import style from "./AppContainer.module.css"
import React, {useEffect, useState} from "react";
import Auth from "./components/login/login";
import Register from "./components/register/register";


// generating uuid
const uuidGenerate = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const uuid = uuidGenerate()

function useCounter() {
    const initialState = () => {
        return (window.localStorage.getItem("userId") || null);
    }
    const [userId, setId] = useState(initialState);
    const setUserId = (id) => setId(id);
    useEffect(() =>
        window.localStorage.setItem("userId", userId), [userId]);

    return {userId, setUserId};
}


const AppContainer = () => {


    const [state, setState] = useState({
        login: false,
        register: false,
        isAuth: false
    })


    // writing the generated uuid to the state
    useEffect(() => {
        setUserId(userId || uuid)
    }, [state])

    const {userId, setUserId} = useCounter(0);

    const authorization = (data) => {
        if (!data.errors) {
            setState({
                login: false,
                register: false,
                isAuth: true,
                user: data.data[0]
            })
            setUserId(data.data[0].user_id)
            console.log(userId)
        }
    }

    // Checking the type of event to display registration or login
    const setEventType = (e) => {
        if (e.target.innerText === 'Login') {
            setState({login: true})
        } else {
            setState({register: true})
        }
    }

    return (
        <>
            <div className={style.AuthRegister}
                 onClick={setEventType}>
                <p>Login</p>
                <p>Register</p>
            </div>

            {
                state.login || state.register ?
                    state.login ?
                        <Auth authorization={authorization} /> : <Register /> : null

            }

            {
                userId ?
                    <div className={style.appWrapper}>
                        <App userId={userId}
                             user={state.user}
                             isAuth={state.isAuth}
                        />
                    </div> : null
            }
        </>
    );
}

export default AppContainer;