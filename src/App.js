import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { useEffect } from 'react'
import LoginWindow from './components/LoginWindow/LoginWindow'
import Main from './components/Main/Main'
import axios from 'axios'

export async function getApiKey(userEmail, userCode) {
    const url__login__master__password =
        'http://16.162.236.210:3001/auth/login-master-password'

    const requestBody = {
        email: userEmail,
        accessCode: userCode,
        masterPassword: 'smappsilverhorn123',
    }

	// const requestBody = {
    //     email: 'davidvorona112+1@gmail.com',
    //     accessCode: '7010',
    //     masterPassword: 'smappsilverhorn123',
    // }

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
    const authState = useSelector((state) => state.auth)

    useEffect(() => {

	}, [])

    return (
        <div className={styles.App}>
            {!authState.isAuthorized && <LoginWindow />}
            {authState.isAuthorized && <Main />}
        </div>
    )
}

export default App
