import React from "react";
import SideBarUserImage from "./SideBarUserImage";
import SideBarButton from "./SideBarButton"
import { ReactComponent as SideBarExpandMenuSvg } from '../../../assets/resources/image/sidebar-expandmenu-icon.svg'
import { ReactComponent as SideBarCloudIconSvg } from '../../../assets/resources/image/sidebar-cloud-icon.svg'
import { ReactComponent as SideBarWidgetsIconSvg } from '../../../assets/resources/image/sidebar-widgets-icon.svg'
import { ReactComponent as SideBarLogoutIconSvg } from '../../../assets/resources/image/sidebar-logout-icon.svg'

const tmpImagePath = "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/452062748_8445986595464525_6822034819082871625_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHgrIy_877r7xaxwmKi6CRiAkgyaQCYJ-ICSDJpAJgn4rF_4qvHpvwJAR7YUyOdnSdeG1yW0Xkl6ciAX3_K-Y9C&_nc_ohc=wU0tNwcLnrgQ7kNvgGTWcwh&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=AeT7h7ldJNln_X1gyECwafE&oh=00_AYDPJ3XJoVzqow40ovYJs9iTIWDyXbllWhPaBAnMfuDTVQ&oe=675CA8F7";


class SideBarButtonData {
    constructor(icon, title, __func) {
        this.icon = icon;
        this.title = title;
        this.__func = __func;
    }
}

const buttonData = [
    new SideBarButtonData(SideBarCloudIconSvg, "My cloud", () => {window.location.href = "/mycloud"}),
    new SideBarButtonData(SideBarWidgetsIconSvg, "Widgets", () => {window.location.href = "/widgets"})
]

const SideBar = () => {

    return (
        <div id="side-bar" className="w-16 min-w-16 transition-all h-full pt-6 flex flex-col bg-DarkCyanPastel md:w-40    ">
            <SideBarUserImage imagePath={tmpImagePath}/>
            {buttonData.map((_buttonData, index) => (
                <SideBarButton Icon={_buttonData.icon} title={_buttonData.title} _function={_buttonData.__func} />
            ))}


            <div className="w-full h-6 mt-auto mb-2 flex justify-center items-center md:justify-start md:pl-3">
                <button className="size-5">
                    <SideBarLogoutIconSvg className="size-5" />
                </button>
            </div>
        </div>
    );
}

export default SideBar;