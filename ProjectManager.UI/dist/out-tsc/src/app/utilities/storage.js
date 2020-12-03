var AppStorage = /** @class */ (function () {
    function AppStorage() {
    }
    AppStorage.getTokenData = function (dataKey) {
        var token = localStorage.getItem(dataKey);
        return token ? decodeURIComponent(atob(token)) : '';
    };
    AppStorage.storeTokenData = function (dataKey, data) {
        localStorage.setItem(dataKey, btoa(encodeURIComponent(data)));
    };
    return AppStorage;
}());
export { AppStorage };
//# sourceMappingURL=storage.js.map