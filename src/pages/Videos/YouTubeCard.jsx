import YouTube from 'react-youtube';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import { shortNumber } from '../../utils';
import { addToLikes, removeFromLikes } from '../../features/like/likeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { findLikeById } from '../../features/like/likeSlice';
export const YouTubeCard = ({ id, video }) => {

    const dispatch = useDispatch()
    const foundLike = useSelector(state => findLikeById(state, id))

    console.log({ foundLike })

    const { stats, uploadOn, name, videoId, creator } = video;
    const { views, like, dislike } = stats
    const options = {
        height: '95%',
        width: '95%',
        playerVars: {
            autoplay: 1,
        },
    };

    const likeButtonPressed = ({ _id, video }) => {
        foundLike ? dispatch(removeFromLikes({ _id })) : dispatch(addToLikes({ _id, video }))
    }

    return (
        <div className="YouTubeCard flex flex--column flex--align_center flex--justify_around">
            <div className="YouTubeCard-frame">
                <YouTube
                    className="YouTubeCard-player"
                    videoId={videoId}
                    id={id}
                    opts={options} />
            </div>
            <div className="YouTubeCard-body flex flex--column flex--justify_around">
                <p className="YouTubeCard-title">{name}</p>
                <div className="YouTubeCard-content flex flex--align_center flex--justify_between">
                    <div>
                        <span>{shortNumber(views)} views . </span>
                        <span>{uploadOn}</span>
                    </div>
                    <div className="YouTubeCard-content__right flex flex--align_center flex--justify_around">
                        <button
                            onClick={() => likeButtonPressed({ _id: id, video: { _id: id, creator, stats, videoId, name } })}
                            className="YouTubeCard-cta btn">
                            <AiFillLike className={`YouTubeCard-icon ${foundLike && "color-secondary"}`} />
                            <span>{shortNumber(like)}</span>
                        </button>
                        <button className="YouTubeCard-cta btn">
                            <AiFillDislike className="YouTubeCard-icon" />
                            <span>{shortNumber(dislike)}</span>
                        </button>
                        <button className="YouTubeCard-cta btn">
                            <MdPlaylistAdd className="YouTubeCard-icon" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
