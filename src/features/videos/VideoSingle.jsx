import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { RecommendationList, YouTubeInfo, YouTubeCard } from '../../components';
import { selectVideoById, selectVideos } from './videoSlice';

export const VideoSingle = () => {
    const { videoId } = useParams();

    const { videos } = useSelector(selectVideos)
    const foundVideo = useSelector(state => selectVideoById(state, videoId))

    let filteredVideos;
    const filterVideos = (videos, foundVideo) => {
        return videos.filter(video => video._id !== foundVideo._id && video.creator.name === foundVideo.creator.name)
    }

    if (foundVideo) {
        filteredVideos = filterVideos(videos, foundVideo)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [videoId])


    return (
        <div className="VideoSingle">

            {foundVideo ?
                <>
                    <YouTubeCard id={videoId} video={foundVideo} />
                    <YouTubeInfo id={videoId} video={foundVideo} />
                    <RecommendationList id={videoId} videos={filteredVideos} />
                </>
                :
                <h1 className="flex flex--center">Loading...</h1>
            }
        </div>
    )
}

export default VideoSingle

