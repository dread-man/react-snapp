import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { useEffect } from 'react'
import LoginWindow from './components/LoginWindow/LoginWindow'
import Main from './components/Main/Main'
import axios from 'axios'
import { setLogOut } from './store/storeSlices'
import { Route, Routes } from 'react-router-dom'
import Insider from './components/Insider/Insider'

export async function getApiKey(userEmail, userCode) {
    const url__login__master__password =
        'http://16.162.236.210:3001/auth/login-master-password'

    const requestBody = {
        email: userEmail,
        accessCode: userCode,
        masterPassword: 'smappsilverhorn123',
    }

    try {
        const response = await axios.post(
            url__login__master__password,
            requestBody
        )
        const data = response.data
        localStorage.setItem('bearer', data.access_token)
        return data
    } catch (error) {
        console.error('Error:', error)
    }
} // get api key

function App() {
    const dispatch = useDispatch()

    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        const checkLocalStorage = (dispatch) => {
            if (
                localStorage.getItem('bearer') === null &&
                localStorage.getItem('userId') === null
            ) {
                dispatch(setLogOut())
            }
        }

        setTimeout(() => {
            checkLocalStorage(dispatch)
        }, 1000)
    }, []) // for check localstorage null

    return (
        <div className={styles.App}>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <>
                            {!authState.isAuthorized && <LoginWindow />}
                            {authState.isAuthorized && <Main />}
                        </>
                    }
                />

                <Route
                    path="/insider"
                    element={
                        <>	
                            <Insider/>
                        </>
                    }
                />
            </Routes>
        </div>
    )
}

export default App
