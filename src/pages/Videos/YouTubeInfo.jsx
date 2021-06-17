export const YouTubeInfo = ({ id, video }) => {
    const { creator, desc } = video;

    const { avatar, name, subsribers } = creator;
    return (
        <div key={id} className="YouTubeInfo flex">
            <img className="YouTubeInfo-image image--rounded" src={avatar} alt="info" />
            <div className="YouTubeInfo-content flex flex--column">
                <div className="mt-1">
                    <h4>{name}</h4>
                    <p><span>{subsribers} subscribers</span></p>
                </div>
                <div className="YouTubeInfo-desc flex flex--column">
                    {desc.map((item, i) => <p className="mb-1" key={i}>{item}</p>)}
                </div>
            </div>
        </div>
    );
};
