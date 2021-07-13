import { VideoCard } from "../videos/VideoCard"
import { selectAllSaved } from "./saveSlice";
import { useSelector } from "react-redux";
export const Save = () => {

    let content;

    const { saved, status, error } = useSelector(selectAllSaved)

    if (status === "loading") {
        content = <div className="loader loader-like">Loading....</div>
    } else if (status === "fulfilled") {
        content = saved.length > 0 ? (
            <div>
                {saved.map(save => (
                    <div className="Save-playlist" key={save._id}>
                        <h3>{save.name}</h3>
                        <div className="Save-playlist-videos flex mtb-1">
                            {save.videos.map(item => <VideoCard key={item._id} {...item.video} />)}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="fulfilled">Empty, Please save some videos</div>
        )
    } else if (status === "failed") {
        content = <div className="failed failed-like">{error}</div>
    }

    return (
        <div className="Save hide-scroll">
            <h1 className="mb-2 color-gray-300">Your Saved Videos</h1>
            <div className="Save-content flex">
                {content}
            </div>
        </div>
    )
}
