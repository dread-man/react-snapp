// import { useDispatch, useSelector } from 'react-redux'
// import styles from './Posts.module.scss'
// import { useRef, useEffect } from 'react';

// const Posts = () => {
//     const dispatch = useDispatch()
//     const feedStore = useSelector((state) => state.feed)
//     const posts = feedStore.posts

//     const renderedArray = [...Object.keys(posts).map((item) => posts[item])]

//     const parser = new DOMParser()


//     return (
//         <div className={styles.posts}>
//             {renderedArray.map((item, index) => {
//                 return (
//                     <div key={index} className={styles.post}>
//                         <h3>{item.title}</h3>
//                         <span>
//                             {item.content
//                                 ? parser.parseFromString(
//                                       item.content,
//                                       'text/html'
//                                   ).body.textContent
//                                 : ''}
//                         </span>
//                         <div className={styles.user}>
//                             <h3 className={styles.userName}>
//                                 {item.user.name}
//                             </h3>
//                             <div className={styles.stats}>
//                                 <h3>
//                                     <i className="ri-thumb-up-line"></i>{' '}
//                                     {item.stats.totalLikes}
//                                 </h3>
//                                 <h3>
//                                     <i className="ri-chat-3-line"></i>{' '}
//                                     {item.stats.totalComments}
//                                 </h3>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default Posts


// import { useDispatch, useSelector } from 'react-redux';
// import styles from './Posts.module.scss';
// import { useRef, useEffect } from 'react';

// const Posts = () => {
//   const dispatch = useDispatch();
//   const feedStore = useSelector((state) => state.feed);
//   const posts = feedStore.posts;

//   const renderedArray = [...Object.keys(posts).map((item) => posts[item])];

//   const parser = new DOMParser();

//   const postsContainerRef = useRef(null);

//   useEffect(() => {
//     const container = postsContainerRef.current.parentNode;
//     const handleScroll = () => {
//       if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
//         console.log('Скролл находится в самом низу');
//       }
//     };

//     container.addEventListener('scroll', handleScroll);

//     return () => {
//       container.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className={styles.postsContainer}>
//       <div ref={postsContainerRef} className={styles.posts}>
//         {renderedArray.map((item, index) => {
//           return (
//             <div key={index} className={styles.post}>
//               <h3>{item.title}</h3>
//               <span>
//                 {item.content
//                   ? parser.parseFromString(item.content, 'text/html').body.textContent
//                   : ''}
//               </span>
//               <div className={styles.user}>
//                 <h3 className={styles.userName}>{item.user.name}</h3>
//                 <div className={styles.stats}>
//                   <h3>
//                     <i className="ri-thumb-up-line"></i> {item.stats.totalLikes}
//                   </h3>
//                   <h3>
//                     <i className="ri-chat-3-line"></i> {item.stats.totalComments}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Posts;


import { useDispatch, useSelector } from 'react-redux';
import styles from './Posts.module.scss';
import { useEffect } from 'react';

const Posts = () => {
  const dispatch = useDispatch();
  const feedStore = useSelector((state) => state.feed);
  const posts = feedStore.posts;

  const renderedArray = [...Object.keys(posts).map((item) => posts[item])];

  const parser = new DOMParser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('Скролл находится в самом низу');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.posts}>
      {renderedArray.map((item, index) => {
        return (
          <div key={index} className={styles.post}>
            <h3>{item.title}</h3>
            <span>
              {item.content
                ? parser.parseFromString(item.content, 'text/html').body.textContent
                : ''}
            </span>
            <div className={styles.user}>
              <h3 className={styles.userName}>{item.user.name}</h3>
              <div className={styles.stats}>
                <h3>
                  <i className="ri-thumb-up-line"></i> {item.stats.totalLikes}
                </h3>
                <h3>
                  <i className="ri-chat-3-line"></i> {item.stats.totalComments}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
