import React from "react";
import MyCloudBrowser from "./MyCloudBrowser";
import MyCloudNavigation from "./MyCloudNavigation";

const MyCloud = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <MyCloudNavigation />
            <MyCloudBrowser />
        </div>
    );
}

export default MyCloud;