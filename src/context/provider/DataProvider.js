import { createContext, useContext, useReducer } from "react";
const DataContext = createContext()

const dataReducer = (state, dispatch) => {
    const likeItems = state.likeItems
    switch (dispatch.type) {
        case 'GET_LIKE_DATA': {
            return {
                ...state,
                likeItems: dispatch.payload
            }
        }
        case 'ADD_TO_LIKE': {
            return {
                ...state,
                likeItems: likeItems.concat(dispatch.payload.like)
            }
        }
        case 'GET_SAVE_DATA': {
            return {
                ...state,
                saveItems: dispatch.payload
            }
        }
        default: {
            console.log("do nothing")
        }
    }
    return state
}

const initialData = {
    saveItems: [],
    likeItems: []
}

const DataProvider = ({ children }) => {
    const [{ saveItems, likeItems }, dataDispatch] = useReducer(dataReducer, initialData)

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/like/60dad5538c406f003616bfde')
    //             if (response.status === 200) {
    //                 dataDispatch({ type: 'GET_LIKE_DATA', payload: response.data.data.likedList })
    //             }
    //         } catch (error) {
    //             console.log({ error })
    //         }
    //     })();
    //     (async () => {
    //         try {
    //             const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/save/60dad5538c406f003616bfde')
    //             if (response.status === 200) {
    //                 dataDispatch({ type: 'GET_SAVE_DATA', payload: response.data.data.savedList })
    //             }
    //         } catch (error) {
    //             console.log({ error })
    //         }
    //     })()
    // }, [])
    return (
        <DataContext.Provider value={{ saveItems, likeItems, dataDispatch }}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => {
    return useContext(DataContext)
}

export { DataProvider, useData }