import { VideoCard } from "./VideoCard";
import { useSelector } from "react-redux";
import { selectVideos } from "./videoSlice";
import { getFilteredVideos } from "./utils/getFilteredVideos";

const VideosList = () => {

    const { videos, status, error, search } = useSelector(selectVideos)

    let content;

    const filteredVideos = getFilteredVideos(videos, search)

    if (status === 'loading') {
        content = <div className="loader">Loading....</div>
    } else if (status === 'fulfilled') {
        content = filteredVideos.length > 0 ? (
            filteredVideos.map(video => (<VideoCard showClose={false} key={video._id} {...video} />))
        ) : (
            <h1 className="color-light mt-4">No Matching Video Found</h1>
        )
    } else if (status === 'failed') {
        content = <div className="failed">{error}</div>
    }

    return (
        <div className="VideosList ml-1">
            <div className="Videos flex">
                {content}
            </div>
        </div>
    )
}

export default VideosList