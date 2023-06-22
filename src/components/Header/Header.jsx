import { useSelector } from 'react-redux'
import styles from './Header.module.scss'
import { useDispatch } from 'react-redux'
import { setLogOut } from '../../store/storeSlices'
import { useState } from 'react'

const Header = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const userName = feedStore.me.name

	const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className={styles.Header}>
            <a href="/">
                <img src="img/logo_black.svg" alt="" />
            </a>
            <div className={styles.container}>
                <span className={styles.text}>Feed</span>
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
                            <li className={styles.textDrop} onClick={() => {
								dispatch(setLogOut())
							}}>Logout</li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Header
