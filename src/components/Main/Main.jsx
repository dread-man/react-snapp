import styles from './Main.scss'
import { setLogOut } from '../../store/storeSlices'
import { useDispatch, useSelector } from 'react-redux'
import { getConfig } from '../../store/feed/feedSlices'
import { useEffect } from 'react'

const Main = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)

    useEffect(() => {
        dispatch(getConfig(localStorage.getItem('bearer')))
    }, [])

    console.log(feedStore.config)

    return (
        <div className="">
            <hr />
            <button
                onClick={() => {
                    dispatch(setLogOut())
                }}
            >
                LogOut
            </button>
        </div>
    )
}

export default Main
