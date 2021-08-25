import React, {useState} from "react";
import styles from './userBlock.module.css'

const UserBlock = ({user, isAuth}) => {
    const [state, setState] = useState({
        settings: false
    })

    const switcher = (e) => {
        if (e.target.attributes.relationship) {
            let stateKey = e.target.attributes.relationship.value
            console.log(e.target.attributes)
            setState((prev) => {
                return {
                    ...prev,
                    [stateKey]: !state[stateKey]
                }
            })
        }
    }

    return (
        <div className={styles.userBlock}>

            <div className={styles.userInfo} onClick={switcher}>
                {
                    isAuth ? <p className={styles.userName} style={{color: '#fff'}}>
                        {user.first_name}
                    </p> : <p> anonymous </p>
                }
                <div className={state.settings ? styles.settingsOpened : styles.settingsClosed}>
                    <div className={styles.closeSettings}
                         relationship={"settings"}/>
                </div>
                <div className={styles.trigram}
                     relationship={"settings"}
                />
            </div>

            <div className={styles.searchField}>
                <input type="text" placeholder={'search'}/>
            </div>
            <div className={styles.users}>
                <div className={styles.user}>ivan</div>
                <div className={styles.user}>ivan</div>
                <div className={styles.user}>ivan</div>
                <div className={styles.user}>ivan</div>
                <div className={styles.user}>ivan</div>
                <div className={styles.user}>maksim</div>
                <div className={styles.user}>maksim</div>
                <div className={styles.user}>maksim</div>
                <div className={styles.user}>kirill</div>
                <div className={styles.user}>kirill</div>
                <div className={styles.user}>kirill</div>
                <div className={styles.user}>alexander</div>
                <div className={styles.user}>alexander</div>
            </div>
        </div>
    )
}

export default UserBlock;