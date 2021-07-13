import { VideoCard } from "../videos/VideoCard"
import { useSelector, useDispatch } from "react-redux";
import { removePlaylist, selectAllSaved } from "./saveSlice";

export const Save = () => {

    let content;

    const dispatch = useDispatch()

    const { saved, status, error } = useSelector(selectAllSaved)

    if (status === "loading") {
        content = <div className="loader loader-like">Loading....</div>
    } else if (status === "fulfilled") {
        content = saved.length > 0 ? (
            <>
                {saved && saved.map((save, indx) => (
                    <div className="Save-playlist w-100" key={save._id || indx}>
                        <div className="flex flex--justify_between">
                            <h3>{save.name.toUpperCase()}</h3>
                            <button
                                onClick={() => dispatch(removePlaylist({ playlistId: save._id }))}
                                className="btn btn-outline bg-dark color-light mr-3">
                                Remove {save.name}
                            </button>
                        </div>

                        <div className="Save-playlist-videos flex mtb-1">
                            {save.videos.map(item => <VideoCard playlistId={save._id} like={false} showClose key={item._id} {...item.video} />)}
                        </div>
                    </div>
                ))}
            </>
        ) : (
            <div className="fulfilled">Empty, Please save some videos</div>
        )
    } else if (status === "failed") {
        content = <div className="failed failed-like color-light">{error}</div>
    }
    console.log({ content })
    return (
        <div className="Save">
            <h1 className="mb-2 color-gray-300">Your Saved Videos</h1>
            <div className="Save-content flex">
                {content}
            </div>
        </div>
    )
}
