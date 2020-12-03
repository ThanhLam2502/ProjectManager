import { browser, by, element } from 'protractor';
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    AppPage.prototype.navigateTo = function () {
        return browser.get('/');
    };
    AppPage.prototype.getParagraphText = function () {
        return element(by.css('app-root .dx-drawer-content .dx-card p:nth-child(2)')).getText();
    };
    return AppPage;
}());
export { AppPage };
//# sourceMappingURL=app.po.js.map