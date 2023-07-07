import { useEffect } from 'react'
import styles from './VideoChat.module.scss'

const VideChat = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.mainWindow}></div>
            <div className={styles.footer}>
                <span>Test</span>
                <div className={styles.buttons}>
                    <i className="ri-team-line"></i>
                    <i className="ri-mic-line"></i>
                    {/* <i className="ri-mic-off-line"></i> */}
                    <i  className={`ri-phone-fill ${styles.exit}`}></i>
                </div>
            </div>
        </div>
    )
}

export default VideChat
