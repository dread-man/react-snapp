import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { useEffect } from 'react'
import { getApiKey } from './store/storeSlices'

function App() {
	const dispatch = useDispatch()
    const key = useSelector((state) => state.auth.apiKey)

	useEffect(() => {
		dispatch(getApiKey())
	}, [])

    console.log(key)

    return (
        <div className={styles.App}>
            <h2>Hello World</h2>
        </div>
    )
}

export default App
