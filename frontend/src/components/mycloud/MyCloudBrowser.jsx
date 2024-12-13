import React, { useState, useEffect } from "react";
import { ApiConfiguration } from "../../config/api.config";
import { PopUpItemData } from "./mycloud.class";
import { MyCloudBrowserContentItemList } from "./mycloud.config";
import { extensionToIconPath, changeDir, handlePopupItemClick } from "./mycloud.ultils";


const MyCloudBrowserPopupItem = ({ buttonName, nextLocation }) => {
    return (
        <button
            className="w-full group transition-all hover:bg-SuperLightCyan px-4 py-6 h-5 flex flex-row items-center"
            onClick={() => { handlePopupItemClick(buttonName, nextLocation) }}
        >
            <div className="size-6 bg-LightYellow mr-3"></div>
            <p className="font-inter transition-all font-medium  text-TextGrey group-hover:font-semibold ">{buttonName}</p>
        </button>
    )
}

const MyCloudBrowserPopupSplitLine = () => {
    return (
        <div className="w-full h-fit py-2 flex justify-center items-center">
            <div className="w-36 h-0.25 bg-SuperLightCyan"></div>
        </div>
    )
}

const MyCloudBrowserContentUploadButton = () => {
    return (
        <button>

        </button>
    )
}

const MyCloudBrowserContentItem = ({ Icon, itemName, uploadDate, itemSize, nextLocate }) => {
    const [isVisable, setVisable] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleClickOutSide = (event) => {
        event.preventDefault()
        setVisable(false)
    }

    const contextMenuHandle = (event) => {
        event.preventDefault();
        setPosition({ x: event.pageX, y: event.pageY });
        setVisable(true);
    }

    return (
        //[Pop up menu]
        <>
            {isVisable &&
                <div onClick={handleClickOutSide} onContextMenu={handleClickOutSide} id="browser-popup-container" className="w-full h-full z-20 bg-White fixed bg-transparent">
                    <div
                        className="bg-White w-48 h-fit fixed z-30 py-5 rounded-xl shadow-popup-non"
                        style={{ top: position.y + 'px', left: position.x + 'px' }}
                    >
                        {MyCloudBrowserContentItemList.map((popupItem, index) => {
                            switch (popupItem.itemType) {
                                case PopUpItemData.BUTTON: return (<MyCloudBrowserPopupItem buttonName={popupItem.buttonName} nextLocation={nextLocate} />);
                                case PopUpItemData.SPLIT_LINE: return (<MyCloudBrowserPopupSplitLine />);
                            }
                        })}
                    </div>
                </div>
            }

            <button className="w-full bg-transparent flex flex-col hover:bg-SuperLightCyan hover:cursor-pointer" onContextMenu={contextMenuHandle} onClick={() => { changeDir(nextLocate) }}>
                {/* <div className="w-full h-0.125 bg-LightGrey"></div> */}
                <div className="flex flex-row w-full my-2 text-LightGrey text-xs items-center md:text-sm">
                    <div className="flex flex-row  basis-1/2 overflow-hidden items-center pr-8">
                        {/* {(Icon) ? <Icon className="size-5 aspect-square mr-1 rounded-md md:size-7" /> : <div className="size-5 aspect-square mr-1 rounded-md bg-DarkCyanPastel md:size-7"></div>} */}
                        <img src={Icon} alt={itemName} className="w-5 aspect-auto mr-1 md:w-6 md:mr-4" />
                        <p className="text-ellipsis whitespace-nowrap overflow-hidden">{itemName}</p>
                    </div>
                    <p>{uploadDate}</p>
                    <p className="ml-auto">{itemSize}</p>
                </div>
                <div className="w-full h-0.125 bg-LightGrey"></div>
            </button>
        </>

    )
}
// This component contains items
const MyCloudBrowserContentList = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setLoading(true);
        let locate = new URLSearchParams(window.location.search).get('locate');
        let encodedLocateString = encodeURIComponent(locate);
        let targetMainPath = ApiConfiguration.baseUrl + ':' + ApiConfiguration.port;
        let targetSubPath = '/api/storage' + ((locate != null) ? '/file?locate=' + encodedLocateString : '');

        let apiTarget = targetMainPath + targetSubPath;
        fetch(apiTarget, {
            method: 'GET'
        }).then((response) => {
            console.log("[MyCloudBrowserContentList]: Response instance->");
            console.log(response)
            if (!response.ok) {
                setError(new Error(response.status))
                throw new Error("Some errors occur, status code:" + response.status)
            } else {
                return response.json()
            }
        }).then((body) => {
            console.log(body.data)
            setData(body.data);
        }).catch((error) => {
            setError(error);
            console.error(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [window.location.search])



    if (isLoading) return (
        <div className="w-full font-inter min-h-0 flex-1 overflow-y-scroll">
            <MyCloudBrowserContentItem Icon={null} itemName={"Lemme do it for you~"} uploadDate={"Soon"} itemSize={"@~@"} nextLocate={null} />
        </div>
    );
    if (error) return (<h1>Some error occurs, error here: {error}</h1>);

    return (
        <div className="w-full font-inter min-h-0 flex-1 overflow-y-scroll">
            {
                data.map((_data, index) => {
                    console.log("nextLocate -> " + _data.path)
                    let __name = (_data.extension != 'directory') ? _data.name + '.' + _data.extension : _data.name;
                    let __size = (_data.size >= 0 && _data.extension != 'directory') ? _data.size : ''
                    let __iconPath = extensionToIconPath(_data.extension);


                    return <MyCloudBrowserContentItem Icon={__iconPath} itemName={__name} uploadDate={'??/??/??'} itemSize={__size} nextLocate={_data.path} />
                })}
        </div>
    );
}
const MyCloudBrowserContentTitle = () => {
    return (
        <div className="w-full font-inter h-7 flex flex-col justify-end">
            <div className="flex flex-row mb-1 text-LightGrey002 text-xs md:text-sm">
                <div className="w-1/2">
                    <p className="">File name</p>
                </div>
                <p>Upload date</p>
                <p className="ml-auto">Size</p>
            </div>
            <div className="w-full h-0.25 bg-LightGrey"></div>
        </div>
    )
}
const MyCloudBrowserContent = () => {

    return (
        <div className="w-23/24 h-35/36 min-h-0 overflow-y-hidden flex flex-col shadow-3xl rounded-2xl px-3 py-4 bg-White">
            <MyCloudBrowserContentTitle />
            <MyCloudBrowserContentList />
        </div>
    )
}
const MyCloudBrowser = () => {
    return (
        <div className="w-full flex-1 overflow-y-hidden flex justify-center items-center">
            <MyCloudBrowserContent />
        </div>
    );
}

export default MyCloudBrowser;