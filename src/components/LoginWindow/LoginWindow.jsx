import { useDispatch, useSelector } from 'react-redux'
import styles from './LoginWindow.module.scss'
import { useState } from 'react'
import {
    logIn,
    setUserEmail,
    setAccessCode,
    setAuth,
	setErrorMessage
} from '../../store/storeSlices'

const LoginWindow = () => {
	document.body.style.overflowY = 'auto'

	const authStore = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [userEmail, setUserEmailState] = useState('')
    const [userAccessCode, setUserAccessCodeState] = useState('')

    const data = {
        userEmail: userEmail,
        userCode: userAccessCode,
        apiKey: localStorage.getItem('bearer'),
        setAuth: setAuth,
		setErrorMessage: setErrorMessage,
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
						{
							authStore.errorMessage && <h3 className={styles.errorMessage}>Unauthorized</h3>
						}



                        <label>
                            <img src="img/login_email.svg" alt="Email Img" />
                            <input
                                type="email"
								required
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
