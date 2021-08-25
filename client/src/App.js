import React, {useEffect, useRef, useState} from "react";
import styles from "./App.module.css"
import Header from "./components/header-app";
import UserBlock from "./components/user-block/user-block";


function App({userId, user, isAuth}) {
    const [state, setState] = useState([])

    useEffect(() => {
        fetch("/send",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    primary: true
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setState(data)
                getMessages(data.length)
                setInterval(() => {
                    printWatcher(state.print)
                }, 2000)
            });
    }, [])


    const [text, setText] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();

        const data = new Date().toString().match(/\d\d:\d\d/)

        if (text.length > 0) {
            fetch("/message",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        text: text,
                        time: data[0],
                        userId: userId
                    })
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setText("")
                });
        }
    }

    const myRef = useRef(null)
    const getMessages = (length) => {

        fetch("/send",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    length: length
                }),
                method: "POST",
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setState(data)
                setTimeout(() => {
                    getMessages(data.data.length)
                }, 1000)
            });
    }
    // write value to state from input field, param 'e' get current info of select field
    const scribe = (e) => {
        setText(e.currentTarget.value)
        setState((prev) => {
            return {
                ...prev,
                isPrint: true
            }
        })
        setTimeout(() => {
            setState((prev) => {
                return {
                    ...prev,
                    isPrint: false
                }
            })
        }, 2000)
    }

    const printWatcher = () => {
        fetch("/print",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    time: new Date().toString().match(/\d\d:\d\d:\d\d/),
                    print: state.print
                }),
                method: "POST",
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data[userId], data)
            });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && text) {
            sendMessage(event)
        }
    }

    return (


        <div className={styles.messenger}>
            <UserBlock user={user} isAuth={isAuth}/>

            <div className={styles.menu}>
                <div className={styles.messages} ref={myRef}>
                    {
                        myRef.current && userId && state.data ?
                            <Header myRef={myRef}
                                    length={state.data.length}
                                    userId={userId}
                                    messages={state}
                            /> : null
                    }
                    {
                        state.data ?
                            state.data.map((_el, index) => {
                                return (
                                    <div style={_el.user_id === userId ? {justifyContent: "flex-end"} : null}
                                         className={styles.messageBody}
                                         key={index}
                                    >

                                        <div style={_el.user_id === userId ? {flexDirection: "row-reverse"} : null}
                                             className={styles.message}
                                        >
                                            <p className={_el.user_id === userId ? styles.noActive : styles.active}>
                                                {_el.message}
                                            </p>

                                            <p style={_el.user_id === userId ? {marginRight: 10} : null}
                                               className={styles.messageTime}>
                                                {_el.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }) : null
                    }
                    {
                        state.isUserWriting ? <p>write..</p> : null
                    }
                </div>
                <div className={styles.wrap}>

                    <div className={styles.input}>
                        <input
                            onChange={scribe}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder={"type your message"}
                            value={text}/>
                    </div>

                    <div className={styles.btn}>
                        <form onSubmit={sendMessage}>
                            <button type="submit">submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default App;
