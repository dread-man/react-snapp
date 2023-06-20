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

	const [userEmail, setUserEmailState] = useState('davidvorona112@gmail.com')
	const [userAccessCode, setUserAccessCodeState] = useState('3759')

    useEffect(() => {
        dispatch(setUserEmail(userEmail))
        dispatch(setAccessCode(userAccessCode))
    }, [])

    const data = {
        userEmail: authState.userEmail,
        userCode: authState.userAccessCode,
        apiKey: authState.apiKey,
        setAuth: setAuth,
    }

    return (
        <div>
            <button
                onClick={() => {
                    dispatch(logIn(data))
                }}
            >
                LogIn
            </button>
            {authState.isAuthorized && (
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
            )}
        </div>
    )
}

export default LoginWindow
