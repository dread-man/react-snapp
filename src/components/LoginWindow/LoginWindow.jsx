import { useDispatch, useSelector } from "react-redux"
import styles from "./LoginWindow.module.scss"
import { useEffect, useState } from "react"
import {
    logIn,
    setUserEmail,
    setAccessCode,
    setAuth,
    setLogOut,
} from "../../store/storeSlices"

const LoginWindow = () => {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    const [userEmail, setUserEmailState] = useState("")
    const [userAccessCode, setUserAccessCodeState] = useState("")

    useEffect(() => {
        dispatch(setUserEmail(userEmail))
        dispatch(setAccessCode(userAccessCode))
    }, [])

    const data = {
        userEmail: userEmail,
        userCode: userAccessCode,
        apiKey: authState.apiKey,
        setAuth: setAuth,
    }

    return (
        <div className={styles.modalOverlay}>

            <div className={styles.modal}>
                {/* <img src="public/img/logo_login"></img> */}
                <form>
                    <header>
                        <span>Enter your email & access code</span>
                    </header>
                    <main>
                        <input
                            type="email"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmailState(e.target.value)
                                // console.log(e.target.value)
                            }}
                        ></input>
                        <input
                            type="text"
                            placeholder="Access Code"
                            value={userAccessCode}
                            onChange={(e) => {
                                setUserAccessCodeState(e.target.value)
                                // console.log(e.target.value)
                            }}
                        ></input>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(logIn(data))
                            }}
                        >
                            LogIn
                        </button>
                        {/* {authState.isAuthorized && (
                                <div className="">
                                    <h5>{data.userEmail}</h5>
                                    <h5>{data.userAccessCode}</h5>

                                    <hr />
                                    <button
                                        onClick={() => {
                                            dispatch(setLogOut())
                                        }}
                                    >
                                        LogOut
                                    </button>
                                </div>
                            )} */}
                    </main>
                </form>
            </div>
        </div>
    )
}

export default LoginWindow
