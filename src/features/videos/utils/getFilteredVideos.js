export const getFilteredVideos = (videos, search) => {
    return videos.filter(({ name }) =>
        search.length > 0
            ? name.toLowerCase().includes(search.toLowerCase())
            : true
    )
}
