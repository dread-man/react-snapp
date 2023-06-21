import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { getApiKey, setUserEmail } from './store/storeSlices'
import LoginWindow from './components/LoginWindow/LoginWindow'
import { setLogOut } from './store/storeSlices'

function App() {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getApiKey())
    }, [dispatch])

    return (
        <div className={styles.App}>
            <h3>Hello My Dear Friend</h3>
            {!authState.isAuthorized && <LoginWindow />}
            {authState.isAuthorized && (
                <div className="">
                    <hr />
                    <button onClick={() => {
						dispatch(setLogOut())
					}}>LogOut</button>
                </div>
            )}
        </div>
    )
}

export default App
