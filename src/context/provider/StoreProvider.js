import { useContext, createContext, useState } from 'react'
const StoreContext = createContext();


const StoreProvider = ({ children }) => {
    const [videos, setVideos] = useState(null)
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.get('https://geeky-talks-backend.theniteshnarang.repl.co/video')
    //             setVideos(response.data.videos)
    //         } catch (error) {
    //             console.log({ error })
    //         }
    //     })()
    // }, [])
    return (
        <StoreContext.Provider value={{ videos, setVideos }}>
            {children}
        </StoreContext.Provider>
    )
}


const useStore = () => {
    return useContext(StoreContext)
}

export { StoreProvider, useStore }