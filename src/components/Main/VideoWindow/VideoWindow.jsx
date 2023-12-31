import { useDispatch, useSelector } from 'react-redux'
import styles from './VideoWindow.module.scss'
import { getVideoChatToken } from '../../../store/video/videoSlice'
import { Link } from 'react-router-dom'

const VideoWindow = () => {
    const dispatch = useDispatch()
    const videoStore = useSelector((state) => state.video)
    const videoData = videoStore.videoData

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
                                },
                            )}
                        </div>
                    )}
                    <Link
                        className={styles.link}
                        to="/video-chat"
                        onClick={() => {
                            dispatch(getVideoChatToken(1688362379))
                        }}
                    >
                        <button className={styles.joinButton}>Join now</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default VideoWindow
