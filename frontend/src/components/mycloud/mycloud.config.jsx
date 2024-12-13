import { PopUpItemData } from "./mycloud.class"

export {
    MyCloudBrowserContentItemList
}

const MyCloudBrowserContentItemList = [
    new PopUpItemData(null, 'Open', PopUpItemData.BUTTON),
    new PopUpItemData(null, null, PopUpItemData.SPLIT_LINE),
    new PopUpItemData(null, 'Download', PopUpItemData.BUTTON),
    new PopUpItemData(null, 'Share', PopUpItemData.BUTTON),
    new PopUpItemData(null, 'Delete', PopUpItemData.BUTTON),
]