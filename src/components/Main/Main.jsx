import styles from './Main.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getConfig, getMe } from '../../store/feed/feedSlices'
import { useEffect } from 'react'
import { getApiKey } from '../../App'
import Header from '../Header/Header'
import Category from './Category/Category'
import Posts from './Posts/Posts'
import { getPosts } from '../../store/feed/feedSlices'
import { setLogOut } from '../../store/storeSlices'

const Main = () => {
	const dispatch = useDispatch()
    // const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)

	
    useEffect(() => {
        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode)
            localStorage.setItem('userId', data.id)
        }
		
        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode)
            dispatch(getConfig())
            dispatch(getMe())
			dispatch(getPosts(4))
        }

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync()
        } else {
            const savedUserId = localStorage.getItem('userId')
            if (savedUserId) {
                dispatch(getConfig())
                dispatch(getMe())
				dispatch(getPosts(4))
            }
        }
    }, [authStore.userEmail, authStore.userAccessCode, dispatch])

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
		}, 1000);
        
    }, []) // for check localstorage null

    return (

        <div className={styles.main}>
            <Header />
			<Category/>
			<Posts/>
        </div>
    )
}

export default Main