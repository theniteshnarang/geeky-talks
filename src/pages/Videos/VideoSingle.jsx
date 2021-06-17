import { useParams } from 'react-router-dom';
import { useStore } from '../../context/provider';
import { useEffect } from 'react';
import { YouTubeSecondary } from './YouTubeSecondary';
import { YouTubeInfo } from './YouTubeInfo';
import { YouTubeCard } from './YouTubeCard';

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

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[videoId])


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


