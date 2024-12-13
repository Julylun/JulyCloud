import React from 'react'
import { ReactComponent as NavigationGoBackIconSvg } from '../../assets/resources/image/navigation-goback-icon.svg'
import { ReactComponent as NavigationGoForwardIconSvg } from '../../assets/resources/image/navigation-goforward-icon.svg'


const MyCloudNavigationButton = ({ Icon, _function }) => {
    return (
        <button className="size-8 mr-1 flex justify-center items-center bg-White rounded-full">
            <Icon className="size-4 fill-DarkCyanPastel" />
        </button>
    )
}

const MyCloudNavigationSearchBar = () => {
    return (
        <div className="h-8 flex-1 rounded-xl flex bg-White justify-center items-center">
            <input className="w-11/12 text-xs" />
        </div>
    )
}

const MyCloudNavigation = () => {
    return (
        <div className="w-full h-14 pr-3 pl-2 flex flex-row items-center">
            <MyCloudNavigationButton Icon={NavigationGoBackIconSvg} />
            <MyCloudNavigationButton Icon={NavigationGoForwardIconSvg} />
            <MyCloudNavigationSearchBar />
        </div>
    );
}

export default MyCloudNavigation;