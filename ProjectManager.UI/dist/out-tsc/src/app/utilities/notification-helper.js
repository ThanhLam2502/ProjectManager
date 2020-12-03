import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
var AppNotify = /** @class */ (function () {
    function AppNotify() {
    }
    AppNotify.info = function (message) {
        notify(message, 'info', 5000);
    };
    AppNotify.warning = function (message) {
        notify(message, 'warning', 5000);
    };
    AppNotify.error = function (message) {
        if (message === void 0) { message = ''; }
        if (!message) {
            message = ERROR;
        }
        notify(message, 'error', 5000);
    };
    AppNotify.success = function (message) {
        notify(message, 'success', 5000);
    };
    AppNotify.confirm = function (message, title) {
        return confirm(message, title);
    };
    return AppNotify;
}());
export { AppNotify };
export var ERROR = 'An error has occurred. Please try again.';
//# sourceMappingURL=notification-helper.js.map