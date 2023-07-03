import styles from './Main.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import feedSlices, { getConfig, getMe } from '../../store/feed/feedSlices'
import { useEffect } from 'react'
import { getApiKey } from '../../App'
import Header from '../Header/Header'
import Category from './Category/Category'
import Posts from './Posts/Posts'
import { getPosts, getVideChat } from '../../store/feed/feedSlices'
import { setHeaderName, setLogOut } from '../../store/storeSlices'
import VideoWindow from './VideoWindow/VideoWindow'

const Main = () => {
    const dispatch = useDispatch()
    document.body.style.overflowY = 'scroll'

    const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)
    localStorage.removeItem('postId')

    useEffect(() => {
        dispatch(setHeaderName('Feed'))
        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode)
            localStorage.setItem('userId', data.id)
        }

        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode)
            dispatch(getConfig())
            dispatch(getMe())
			dispatch(getVideChat())
            dispatch(getPosts(sessionStorage.getItem('categoryId')))
        }

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync()
        } else {
            const savedUserId = localStorage.getItem('userId')
            if (savedUserId) {
                dispatch(getConfig())
                dispatch(getMe())
				dispatch(getVideChat())
                dispatch(getPosts(sessionStorage.getItem('categoryId')))
            }
        }

    }, [
        authStore.userEmail,
        authStore.userAccessCode,
        authStore.headerName,
        dispatch,
    ])

    return (
        <main className={styles.main}>
            <Header />
            <Category />
            <Posts />
            <VideoWindow />
        </main>
    )
}

export default Main
