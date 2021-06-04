import YouTube from 'react-youtube'
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/provider'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'

const YouTubeCard = ({ id, video }) => {
    const { stats, uploadOn } = video
    const options = {
        height: '400',
        width: '713',
        playerVars: {
            autoplay: 1,
        },
    }
    return (
        <div className="YouTubeCard flex flex--column flex--align_center flex--justify_around">
            <YouTube
                videoId={id}
                id={id}
                opts={options}
            />
            <p className="YouTubeCard-title">{video?.name}</p>
            <div className="YouTubeCard-content flex flex--align_center flex--justify_between">
                <div>
                    <span>{stats?.views} views . </span>
                    <span>{uploadOn}</span>
                </div>
                <div className="YouTubeCard-content__right flex flex--align_center flex--justify_around">
                    <span className="YouTubeCard-cta">
                        <AiFillLike className="react-icon" />
                        <span>{stats?.like}</span>
                    </span>
                    <span className="YouTubeCard-cta">
                        <AiFillDislike className="react-icon" />
                        <span>{stats?.disklike}</span>
                    </span>
                    <span className="YouTubeCard-cta">
                        <MdPlaylistAdd className="react-icon" />
                        <span>Save</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
const YouTubeInfo = ({ id, video }) => {
    const { creator, desc } = video
    
    const { avatar, name, subsribers } = creator
    return (
        <div key={id} className="YouTubeInfo flex">
            <img className="YouTubeInfo-image image--rounded" src={avatar} alt="info"/>
            <div className="YouTubeInfo-content flex flex--column flex--justify_between">
                <div className="mt-1">
                    <h4>{name}</h4>
                    <p><span>{subsribers} subscribers</span></p>
                </div>
                <div className="YouTubeInfo-desc flex flex--column flex--justify_around">
                    {desc.map((item,i) => <p key={i}>{item}</p>)}
                </div>
            </div>
        </div>
    )
}

const YouTubeSecondaryCard = ({ video }) => {
    const { name, _id, creator, stats } = video
    const thumbnailImage = `https://img.youtube.com/vi/${_id}/hqdefault.jpg`
    return (
        <div className="YouTubeSecondary-card card flex flex--justify_around">
            <div className="YouTubeSecondary-card-header card__header">
                <img className="card__image" src={thumbnailImage} alt="card" />
            </div>

            <div className="YouTubeSecondary-card-content card__content flex flex--column flex--justify_around">
                <h3 className="YouTubeSecondary-card-content-title">{name.split('-')[0]}</h3>
                <p>{creator.name}</p>
                <p>{stats.views} views</p>
            </div>
        </div>
    );
}

const YouTubeSecondary = ({ videos }) => {
    return (
        <div className="YouTubeSecondary">
            {videos.map(video => <YouTubeSecondaryCard key={video._id} video={video} />)}
        </div>
    )
}
export const VideoSingle = () => {
    const { videoId } = useParams();
    const { videos } = useStore()
  
    const foundVideo = videos?.find(item => item._id === videoId)
  
    let filteredVideos;
    const filterVideos = (videos, foundVideo) => {
        return videos.filter(video => video._id !== foundVideo._id && video.creator.name === foundVideo.creator.name)
    }

    if (foundVideo) {
        filteredVideos = filterVideos(videos, foundVideo)
    }


    return (
        <div className="VideoSingle">

            {foundVideo ?
                <>
                    <YouTubeCard id={videoId} video={foundVideo} />
                    <YouTubeInfo id={videoId} video={foundVideo} />
                    <YouTubeSecondary id={videoId} videos={filteredVideos} />
                </>
                :
                <h1 className="flex flex--center">Loading...</h1>
            }
        </div>
    )
}


