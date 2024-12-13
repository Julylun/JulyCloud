import React from "react";

const SideBarUserImage = ({ imagePath }) => {
    return (
        <div className="flex flex-col justify-center items-center mb-5">
            <div id="side-bar__user-image-container" className="w-full aspect-square flex flex-col justify-center items-center">
                <img alt="" title="" id="side-bar__user-image" className="w-3/4 h-3/4 rounded-full bg-[#cf37d0] md:w-3/5 md:h-3/5" src={imagePath} />
            </div>
            <p className="hidden md:inline md:font-inter md:text-White md:font-bold">Hoang Luan</p>
        </div>
    )
}

export default SideBarUserImage;