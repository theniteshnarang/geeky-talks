import YouTube from 'react-youtube';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import { shortNumber } from '../../utils';

export const YouTubeCard = ({ id, video }) => {
    const { stats, uploadOn, name} = video;
    const {views, like, disklike} = stats
    const options = {
        height: '95%',
        width: '95%',
        playerVars: {
            autoplay: 1,
        },
    };
    return (
        <div className="YouTubeCard flex flex--column flex--align_center flex--justify_around">
            <div className="YouTubeCard-frame">
                <YouTube
                    className="YouTubeCard-player"
                    videoId={id}
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
                        <span className="YouTubeCard-cta">
                            <AiFillLike className="YouTubeCard-icon" />
                            <span>{shortNumber(like)}</span>
                        </span>
                        <span className="YouTubeCard-cta">
                            <AiFillDislike className="YouTubeCard-icon" />
                            <span>{shortNumber(disklike)}</span>
                        </span>
                        <span className="YouTubeCard-cta">
                            <MdPlaylistAdd className="YouTubeCard-icon" />
                            <span>Save</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
