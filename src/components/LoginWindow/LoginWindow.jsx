import { useDispatch } from "react-redux"
import styles from "./LoginWindow.module.scss"
import { useEffect, useState } from "react"
import {
    logIn,
    setUserEmail,
    setAccessCode,
    setAuth,
} from "../../store/storeSlices"

const LoginWindow = () => {
    const dispatch = useDispatch()

    const [userEmail, setUserEmailState] = useState("")
    const [userAccessCode, setUserAccessCodeState] = useState("")
	
    const data = {
        userEmail: userEmail,
        userCode: userAccessCode,
        apiKey: localStorage.getItem("bearer"),
        setAuth: setAuth,
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <img src="img/logo_login.svg" alt="Logo" />
                <form>
                    <header>
                        <span>Enter your email & access code</span>
                    </header>
                    <main>
                        <label>
                            <img src="img/login_email.svg" alt="Email Img" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => {
                                    setUserEmailState(e.target.value)
									dispatch(setUserEmail(e.target.value))
                                }}
                            ></input>
                        </label>

                        <label>
                            <img
                                src="img/login_password.svg"
                                alt="Password Img"
                            />
                            <input
                                type="password"
                                placeholder="Access Code"
                                value={userAccessCode}
                                onChange={(e) => {
                                    setUserAccessCodeState(e.target.value)
									dispatch(setAccessCode(e.target.value))
                                }}
                            ></input>
                        </label>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(logIn(data))
                            }}
                        >
                            Sign in
                        </button>
                    </main>
                </form>
            </div>
        </div>
    )
}

export default LoginWindow
