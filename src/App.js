import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { getApiKey, setUserEmail } from './store/storeSlices'
import LoginWindow from './components/LoginWindow/LoginWindow'

function App() {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getApiKey())
    }, [dispatch])

	console.log(authState.userEmail)
    console.log(authState.isAuthorized)

    return (
        <div className={styles.App}>
            {/* <h3>Hello My Dear Friend</h3> */}
			
			{!authState.isAuthorized && <LoginWindow/>}
            
        </div>
    )
}

export default App
