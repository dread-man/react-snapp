import { useDispatch, useSelector } from 'react-redux'
import styles from './VideoWindow.module.scss'
import { getVideoChatToken } from '../../../store/video/videoSlice'


const VideoWindow = () => {
    const dispatch = useDispatch()
    const feedStore = useSelector((state) => state.feed)
    const videoData = feedStore.videoData

    return (
        <div className={styles.videoContainer}>
            {videoData && (
                <div>
                    <div className={styles.snappChat}>Snappchat</div>
                    <div className={styles.title}>{videoData.title}</div>
                    <div className={styles.desc}>{videoData.description}</div>
                    <div className={styles.desc}>Speakers:</div>
                    <div className={styles.speakers}>
                        {videoData.broadcasters.map((item, index) => (
                            <div key={index}>{item.name}</div>
                        ))}
                    </div>
                    {videoData.startAt && (
                        <div className={styles.date}>
                            {new Date(videoData.startAt).toLocaleString(
                                'en-US',
                                {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                }
                            )}
                        </div>
                    )}
                    <button className={styles.joinButton} onClick={() => {dispatch(getVideoChatToken(1688362379))}}>
                        Join now
                    </button>
                </div>
            )}
        </div>
    )
}

export default VideoWindow
