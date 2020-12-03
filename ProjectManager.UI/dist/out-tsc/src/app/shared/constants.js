/**
 * App Config
 */
export var AUTH_SCHEME = 'Bearer ';
export var ACCESS_TOKEN_KEY = 'et';
export var REFRESH_TOKEN_KEY = 'ert';
export var IMAGE_TOKEN_KEY = 'eit';
export var HOME_URL_KEY = 'ehu';
export var REMEMBER_ME_KEY = 'er';
/**
 * Shared
 */
export var VALIDATION_REGEX = {
    // Old phone regex
    // phone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    // Australian phone regex
    // phone: /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/,
    // 7+numbers phone regex
    // tslint:disable-next-line:max-line-length
    phone: /^[+]?(?=(?:[^\dx]*\d){7})(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/,
    email: /^[a-zA-Z0-9_\.]{3,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/,
    postCode: /^(\d{4})$/
};
//# sourceMappingURL=constants.js.map