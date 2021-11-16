import { VideoCard } from "../videos/VideoCard"
import { removePlaylist } from "./saveSlice"
import { useDispatch } from "react-redux"

export const SavedItemTile = ({ save, indx }) => {
    const dispatch = useDispatch()
    const { _id, name, videos } = save
    return (
        <div className="Save-playlist w-100" key={_id || indx}>
            <div className="flex flex--justify_between">
                <h3>{name.toUpperCase()}</h3>
                <button
                    onClick={() => dispatch(removePlaylist({ playlistId: _id }))}
                    className="Save-playlist-remove btn btn-outline bg-dark color-light">
                    Remove {name}
                </button>
            </div>

            <div className="Save-playlist-videos flex mtb-1">
                {videos.map(item => <VideoCard playlistId={_id} like={false} showClose key={item._id} {...item.video} />)}
            </div>
        </div>
    )
}

