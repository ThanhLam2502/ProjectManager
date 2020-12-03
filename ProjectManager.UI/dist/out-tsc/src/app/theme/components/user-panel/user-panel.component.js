import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/modules/core/models';
var UserPanelComponent = /** @class */ (function () {
    function UserPanelComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.menuItems = [
            {
                text: 'Profile',
                icon: 'user'
            },
            {
                text: 'Logout',
                icon: 'runner',
                onClick: function () {
                    _this.authService.logout();
                }
            }
        ];
        this.currentUser = new UserModel();
        this.subscription = new Subscription();
    }
    UserPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.authService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        }));
    };
    UserPanelComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UserPanelComponent = __decorate([
        Component({
            selector: 'app-user-panel',
            templateUrl: 'user-panel.component.html',
            styleUrls: ['./user-panel.component.scss']
        })
    ], UserPanelComponent);
    return UserPanelComponent;
}());
export { UserPanelComponent };
//# sourceMappingURL=user-panel.component.js.map