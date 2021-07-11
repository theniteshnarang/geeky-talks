import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { YouTubeSecondary } from '../../pages/Videos/YouTubeSecondary';
import { YouTubeInfo } from '../../pages/Videos/YouTubeInfo';
import { YouTubeCard } from '../../pages/Videos/YouTubeCard';
import { useSelector } from 'react-redux'
import { selectVideoById, selectAllVideos } from './videoSlice';

export const VideoSingle = () => {
    const { videoId } = useParams();

    const { videos } = useSelector(selectAllVideos)
    const foundVideo = useSelector(state => selectVideoById(state, videoId))

    console.log({ foundVideo, videos })

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
                    <YouTubeSecondary id={videoId} videos={filteredVideos} />
                </>
                :
                <h1 className="flex flex--center">Loading...</h1>
            }
        </div>
    )
}


