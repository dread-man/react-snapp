import styles from './Main.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getConfig, getMe } from '../../store/feed/feedSlices'
import { useEffect } from 'react'
import { getApiKey } from '../../App'
import Header from '../Header/Header'
import Category from './Category/Category'
import Posts from './Posts/Posts'
import { getPosts } from '../../store/feed/feedSlices'

const Main = () => {
	document.body.style.overflowY = 'scroll'

    const dispatch = useDispatch()
    // const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)

    useEffect(() => {
        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode)
            localStorage.setItem('userId', data.id)
        }
		dispatch(getPosts(4))

        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode)
            dispatch(getConfig())
            dispatch(getMe())
        }

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync()
        } else {
            const savedUserId = localStorage.getItem('userId')
            if (savedUserId) {
                dispatch(getConfig())
                dispatch(getMe())
            }
        }
    }, [authStore.userEmail, authStore.userAccessCode, dispatch])

    return (
        <div className={styles.main}>
            <Header />
			<Category/>
			<Posts/>
        </div>
    )
}

export default Main