var ImageUtility = /** @class */ (function () {
    function ImageUtility() {
    }
    ImageUtility.setAvatar = function (object) {
        if (!object.avatarImg) {
            object.nameAvatar = ImageUtility.getAvatarName(object.firstName, object.lastName);
        }
        else {
            // object.avatarImg = ImageUtility.replaceImagesLinks(object.avatarImg);
        }
    };
    ImageUtility.getAvatarName = function (firstName, lastName) {
        var result = '';
        if (firstName) {
            result += firstName.substr(0, 1).toUpperCase();
        }
        if (lastName) {
            result += lastName.substr(0, 1).toUpperCase();
        }
        return result;
    };
    return ImageUtility;
}());
export { ImageUtility };
//# sourceMappingURL=image.js.map