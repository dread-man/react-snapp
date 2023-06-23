import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Insider.module.scss';
import { getApiKey } from '../../App';
import feedSlices, { getMe, setPostId } from '../../store/feed/feedSlices';
import Header from '../Header/Header';
import { getPostById } from '../../store/feed/feedSlices';
import { setHeaderName } from '../../store/storeSlices';

const Insider = () => {
    const dispatch = useDispatch();
    const feedStore = useSelector((state) => state.feed);
    const authStore = useSelector((state) => state.auth);
    // let postId = localStorage.getItem('postId')



    useEffect(() => {
		
        dispatch(setHeaderName('Insider'));

        const fetchData = async (userEmail, userCode) => {
            const data = await getApiKey(userEmail, userCode);
            localStorage.setItem('userId', data.id);
        };

        const fetchDataAsync = async () => {
            await fetchData(authStore.userEmail, authStore.userAccessCode);
            dispatch(getMe());
        };

        if (authStore.userEmail && authStore.userAccessCode) {
            fetchDataAsync();
        } else {
            const savedUserId = localStorage.getItem('userId');
            if (savedUserId) {
                dispatch(getMe());
            }
        }

        const savedPostId = localStorage.getItem('postId');
        if (savedPostId) {
            dispatch(setPostId(savedPostId));
        }


		dispatch(getPostById(savedPostId))
    }, [authStore.userEmail, authStore.userAccessCode, dispatch]);



	const postIdRender = feedStore.postIdRender
	console.log(postIdRender.id)

    return (
        <div className={styles.insider}>
            <Header />
            <h3>{postIdRender.id}</h3>
        </div>
    );
};

export default Insider;


