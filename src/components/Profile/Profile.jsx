import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import styles from './Profile.module.scss'
import { setHeaderName } from '../../store/storeSlices'
import { getMe } from '../../store/feed/feedSlices'
import { getApiKey } from '../../App'
import { getUserProfile } from '../../store/user/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const authStore = useSelector((state) => state.auth)
    const userStore = useSelector((state) => state.user)

    const userId = sessionStorage.getItem('userId')
    const userData = userStore.userData

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

        dispatch(getUserProfile(userId))
    }, [])

    // console.log(userData)

    return (
        <div>
            <Header />

            {userData && (
                <img
                    className={styles.userAvatar}
                    src={userData.avatar ? userData.avatar : `http://16.162.235.143:3002/assets/avatarPlaceholder${ Math.floor(Math.random() * 4) + 1}.png`}
                    alt=""
                />
            )}

            {userData && (
                <div>
                    <h3 className={styles.userName}>{userData.name}</h3>
                    <div className={styles.bio}>{userData.bio}</div>
                </div>
            )}
        </div>
    )
}

export default Profile
