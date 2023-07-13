import { useEffect, useState } from 'react'
import styles from './VideoChat.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoChat } from '../../store/video/videoSlice'
import { Link } from 'react-router-dom'

const VideoChat = () => {
    const dispatch = useDispatch()
    const [micro, setMicro] = useState(true)
    const videoStore = useSelector((state) => state.video)

    useEffect(() => {
        dispatch(getVideoChat())
        document.body.style.overflow = 'hidden'
    }, [])

    const videoData = videoStore.videoData
    console.log(videoData)

    return (
        <div className={styles.container}>
            <div className={styles.mainWindow}></div>
            <div className={styles.footer}>
                <span>{videoData && videoData.description}</span>
                <div className={styles.buttons}>
                    <i className="ri-team-line"></i>
                    {micro && (
                        <i
                            className="ri-mic-line"
                            onClick={() => {
                                setMicro(!micro)
                            }}
                        ></i>
                    )}
                    {!micro && (
                        <i
                            className={`ri-mic-off-line ${styles.offMicro}`}
                            onClick={() => {
                                setMicro(!micro)
                            }}
                        ></i>
                    )}
                    <Link className={styles.link} to="/">
                        <i className={`ri-phone-fill ${styles.exit}`}></i>
                    </Link>
                </div>
            </div>
        </div>
	// 	 <div className={styles.container}>
	// 	 <div className={styles.mainWindow}></div>
	// 	 <div className={styles.footer}>
	// 		 <span>{videoData && videoData.description}</span>
	// 		 <div className={styles.buttons}>
	// 			 <i className="ri-team-line"></i>
	// 			 {micro && (
	// 				 <i
	// 					 className="ri-mic-line"
	// 					 onClick={() => {
	// 						 setMicro(!micro)
	// 					 }}
	// 				 ></i>
	// 			 )}
	// 			 {!micro && (
	// 				 <i
	// 					 className={`ri-mic-off-line ${styles.offMicro}`}
	// 					 onClick={() => {
	// 						 setMicro(!micro)
	// 					 }}
	// 				 ></i>
	// 			 )}
	// 			 <Link className={styles.link} to="/">
	// 				 <i className={`ri-phone-fill ${styles.exit}`}></i>
	// 			 </Link>
	// 		 </div>
	// 	 </div>
	//  </div>
    )
}

export default VideoChat
