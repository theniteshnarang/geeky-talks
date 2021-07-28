import { VideoCard } from "./VideoCard";
import { useSelector } from "react-redux";
import { selectAllVideos } from "./videoSlice";

export const VideosList = () => {

    const { videos, status, error, search } = useSelector(selectAllVideos)

    let content;

    const getFilteredVideos = (videos, search) => {
        return videos.filter(({ name }) => search.length > 0 ? name.toLowerCase().includes(search.toLowerCase()) : true)
    }

    const filteredVideos = getFilteredVideos(videos, search)

    if (status === 'loading') {
        content = <div className="loader">Loading....</div>
    } else if (status === 'fulfilled') {
        content = filteredVideos.map(video => (<VideoCard showClose={false} key={video._id} {...video} />))
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