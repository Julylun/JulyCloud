import React from "react";

const SideBarButton = ({ Icon, title, _function }) => {
    return (
        <button onClick={_function} className="w-full h-16 group transition-all hover:bg-LightCyan flex flex-row justify-center items-center">
            <div className="flex flex-row items-center justify-start w-fit">
                <Icon className="size-8 md:mr-3 transition-all fill-White group-hover:fill-LightYellow" />
                <p className="hidden md:inline md:font-inter md:transition-all md:text-White md:font-bold md:group-hover:text-LightYellow">{title}</p>
            </div>
        </button>
    );
}

export default SideBarButton;