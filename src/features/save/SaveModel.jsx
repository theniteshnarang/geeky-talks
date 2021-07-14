import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import { backroundUnscrollable } from "../../utils"
import { selectAllSaved, createPlaylist, addToPlaylist, saveButtonPressed as closeButtonPressed } from "./saveSlice"

export const SaveModel = () => {
    const dispatch = useDispatch()
    const [toggleCreate, setToggleCreate] = useState(false)
    const { isModelOpen, saved, video } = useSelector(selectAllSaved)
    const [checkedOption, setCheckedOption] = useState(false)
    const [inputName, setInputName] = useState("")
    const { user } = useSelector(state => state.auth)
    console.log({ user })

    useEffect(() => {
        backroundUnscrollable(isModelOpen)
        isModelOpen || setToggleCreate(create => false)
        isModelOpen || setCheckedOption(checkedOption => false)
        isModelOpen || setInputName(input => "")
    }, [isModelOpen])

    const handleSubmit = ({ checkedOption, inputName, video, user }) => {
        if (inputName) {
            dispatch(createPlaylist({ name: inputName, video, user }))
        }
        if (checkedOption) {
            dispatch(addToPlaylist({ playlistId: checkedOption, video }))
        }
    }

    const saveChanges = (
        <button
            className="btn btn-secondary btn-round--corner btn-sm modal-close mr-1"
            type="submit"
            onClick={(e) => {
                e.preventDefault();
                handleSubmit({ checkedOption, inputName, video, user: user._id })
            }}
        >
            Save changes
        </button>
    )

    return (
        <>
            <div className={`flex flex--center modal ${isModelOpen || 'modal-hide'}`}>
                <div className="modal-dialog flex flex--center">
                    <div className="modal-content">
                        <div className="modal-header pos-rel flex flex--align_center">
                            <h4 className="modal-title ml-1">Save to...</h4>
                            <button onClick={() => dispatch(closeButtonPressed(null))} className="modal-btn modal-close btn btn-icon">
                                <i className="bi bi-x fs-2"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-text ml-1">Select the playlist or create new one</p>
                            <ul className="modal-list list list-stacked flex flex--column">
                                {saved.map(({ _id, name }, indx) => (
                                    <li key={_id || indx} className="modal-list-item list__item">
                                        <label >
                                            <input
                                                type="radio"
                                                name="playlist"
                                                value={_id}
                                                onChange={() => {
                                                    setCheckedOption(checkedOption => _id)
                                                    setInputName(input => "") // resets input
                                                }}
                                                checked={checkedOption && checkedOption === _id}
                                            /> &nbsp;{name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer flex flex--justify_between flex--align_center">
                            <button
                                className="btn btn-sm btn-outline btn-round--corner ml-1"
                                onClick={() => {
                                    setToggleCreate(create => !create)
                                }} >Create New</button>
                            {toggleCreate || saveChanges}
                        </div>
                        {toggleCreate && (
                            <form className="input-container mb-1 flex flex--justify_between">
                                <div className="ml-1">
                                    <label className="modal-input input-label">Playlist</label>
                                    <input
                                        onChange={(e) => {
                                            setInputName(name => e.target.value)
                                            setCheckedOption(option => false) // resets option
                                        }}
                                        value={inputName}
                                        className="input" type="text" name="playlist" placeholder="playlist Name" required />
                                </div>
                                {saveChanges}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}