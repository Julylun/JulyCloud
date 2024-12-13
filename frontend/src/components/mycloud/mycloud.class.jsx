export {
    PopUpItemData,
    ContentItem
}

class PopUpItemData {
    static BUTTON = 0;
    static SPLIT_LINE = 1;
    constructor(icon, buttonName, itemType) {
        this.icon = icon;
        this.buttonName = buttonName;
        this.itemType = itemType;
    }
}

class ContentItem {
    constructor(itemIcon, itemName, itemUploadDate, itemSize) {
        this.itemIcon = itemIcon;
        this.itemName = itemName;
        this.itemUploadDate = itemUploadDate;
        this.itemSize = itemSize;
    }

    static extensionToIconPath() {

    }
}