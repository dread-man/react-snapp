import { useDispatch, useSelector } from 'react-redux'
import styles from './LoginWindow.module.scss'
import { useEffect, useState } from 'react'
import {
    logIn,
    setUserEmail,
    setAccessCode,
    setAuth,
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
        
    }

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
           
        </div>
    )
}

export default LoginWindow
