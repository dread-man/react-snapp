import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import { setHeaderName } from '../../store/storeSlices'
import { getMe } from '../../store/feed/feedSlices'
import { getApiKey } from '../../App'


const Profile = () => {	
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const authStore = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setHeaderName('Profile'))

        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode)
            localStorage.setItem('userId', data.id)
        }

        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode)
            dispatch(getMe())
        }

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync()
        } else {
            const savedUserId = localStorage.getItem('userId')
            if (savedUserId) {
                dispatch(getMe())
            }
        }
    }, [])

    return (
        <div>
            <Header />
            <h2>Profiles</h2>
        </div>
    )
}

export default Profile
