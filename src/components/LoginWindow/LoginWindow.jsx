import { useDispatch, useSelector } from 'react-redux'
import styles from './LoginWindow.module.scss'
import { useEffect, useState } from 'react'
import {
    logIn,
    setUserEmail,
    setAccessCode,
    setAuth,
    setLogOut,
} from '../../store/storeSlices'

const LoginWindow = () => {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    const [userEmail, setUserEmailState] = useState('')
    const [userAccessCode, setUserAccessCodeState] = useState('')

    useEffect(() => {
        dispatch(setUserEmail(userEmail))
        dispatch(setAccessCode(userAccessCode))
    }, [])

    const handleEmailChange = (e) => {
        setUserEmailState(e.target.value)
    }

    const handleAccessCodeChange = (e) => {
        setUserAccessCodeState(e.target.value)
    }

    const handleLogOut = () => {
        dispatch(setLogOut())
    }

    // const data = {
    //     userEmail: authState.userEmail,
    //     userCode: authState.userAccessCode,
    //     apiKey: authState.apiKey,
    //     setAuth: setAuth,
    // }

    const data = {
        userEmail: userEmail,
        userCode: userAccessCode,
        apiKey: authState.apiKey,
        setAuth: setAuth,
    }

    return (
        <div>
            {!authState.isAuthorized && (
                <div>
                    <button
                        onClick={() => {
                            dispatch(logIn(data))
                        }}
                    >
                        LogIn
                    </button>
                    <hr />
                    <input type="email" required onChange={handleEmailChange} />
                    <hr />
                    <input type="text" onChange={handleAccessCodeChange} />
                    <hr />
                </div>
            )}

            {authState.isAuthorized && (
                <div className="">
                    <h5>{data.userEmail}</h5>
                    <h5>{data.userAccessCode}</h5>

                    <hr />
                    <button onClick={handleLogOut}>LogOut</button>
                </div>
            )}
        </div>
    )
}

export default LoginWindow
