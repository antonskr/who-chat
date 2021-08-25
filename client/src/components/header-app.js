import styles from "../App.module.css"
import {useEffect, useState} from "react";


const Header = ({myRef, length, userId, messages}) => {


    const [state, setState] = useState({
        count: 0,
        primary: true,
    })

    const checkingViews = () => { // check if the user has read the message
        if (
            myRef.current.clientHeight
            + myRef.current.scrollTop
            === myRef.current.scrollHeight
        ) {
            setState({
                count: 0,
                primary: false,
            })
        } else {
            setState({
                count: 0,
                primary: false,
            })
        }
    }

    useEffect(() => {
        scrollDown()
        myRef.current.onscroll = () => {
            checkingViews()
        }
    }, [])

    useEffect(() => {
        const lastMessageId = messages.data[messages.data.length - 1].user_id
        if (state.primary) {
            setState({
                count: 0,
                primary: false
            });
        } else {
            if (myRef.current.scrollHeight > myRef.current.clientHeight && userId !== lastMessageId) {
                setState({
                    count: state.count + 1,
                    primary: false
                })
            }
            if (userId === lastMessageId) {
                scrollDown()
            }
        }
    }, [length])

    const scrollDown = () => {
        myRef.current.scrollTop = myRef.current.scrollHeight
        setState({
            count: 0,
            primary: false
        })
    }
    return (
        <>
            {
                myRef.current.clientHeight
                + myRef.current.scrollTop
                !== myRef.current.scrollHeight ?
                    <div className={styles.headWrapper}>
                        <div
                            className={styles.counter}
                            onClick={scrollDown}
                            style={state.count > 0 ?
                                {color: "#36c4ff"} : {color: "#fff"}
                            }
                        >
                            {
                                state.count > 0 ? state.count : null
                            }
                            <div className={state.count <= 0 ? styles.arrow : `${styles.arrow} ${styles.blink}`}/>
                        </div>
                    </div> : null
            }
        </>
    );
}

export default Header;