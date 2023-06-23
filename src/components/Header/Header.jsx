import { useSelector } from 'react-redux'
import styles from './Header.module.scss'
import { useDispatch } from 'react-redux'
import { setLogOut } from '../../store/storeSlices'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setHeaderName } from '../../store/storeSlices' 

const Header = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
	const authStore = useSelector(state => state.auth)
    const userName = feedStore.me.name

    const [showDropdown, setShowDropdown] = useState(false)

    const handleMouseEnter = () => {
        setShowDropdown(true)
    }

    const handleMouseLeave = () => {
        setShowDropdown(false)
    }

	const headerName = authStore.headerName

    return (
        <div className={styles.Header}>
            <a href="/">
                <img src="img/logo_black.svg" alt="" />
            </a>
            <div className={styles.container}>
                <span className={styles.text}>{headerName}</span>
            </div>
            <ul className={styles.list}>
                <li
                    className={styles.text}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {userName}
                    {showDropdown && (
                        <ul className={styles.dropdown}>
                            <Link
                                to="/"
                                className={styles.link}
                                onClick={() => {
                                    dispatch(setLogOut())
                                }}
                            >
                                <li className={styles.textDrop}>Logout</li>
                            </Link>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default Header
