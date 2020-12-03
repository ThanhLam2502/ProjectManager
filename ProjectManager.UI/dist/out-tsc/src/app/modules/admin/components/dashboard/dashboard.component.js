import { __assign, __decorate } from "tslib";
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ProjectViewModel } from '@app/modules/core/models/project';
import notify from 'devextreme/ui/notify';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(pmServive) {
        this.pmServive = pmServive;
        this.tabIndex = 0;
        this.popupDropdownVisible = false;
        this.popupProjectsVisible = false;
        this.popupAddVisible = false;
        this.isCollapsed = false;
        this.isVissibleDropDown = false;
        this.lookupData = [
            { id: 0, name: 'Open' },
            { id: 1, name: 'Closed' },
        ];
        this.buttonOptions = {
            text: 'Submit',
            stylingMode: 'outlined',
            type: 'success',
            width: 120,
            useSubmitBehavior: 'true',
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsers();
        this.getProjects();
        setTimeout(function () {
            _this.isVissibleDropDown = true;
        }, 3000);
    };
    DashboardComponent.prototype.getProjects = function () {
        var _this = this;
        this.pmServive.getProjects().subscribe(function (item) { return _this.projects = item.data; });
    };
    DashboardComponent.prototype.getUsers = function () {
        var _this = this;
        this.pmServive.getUsers()
            .subscribe(function (item) { return _this.users = item; });
    };
    DashboardComponent.prototype.dblSelectTabProject = function (e) {
        this.tabIndex = e.rowIndex;
        this.popupDropdownVisible = false;
        this.popupProjectsVisible = false;
    };
    DashboardComponent.prototype.selectProjectItemInDropdown = function (index) {
        this.tabIndex = index;
        this.popupDropdownVisible = false;
    };
    DashboardComponent.prototype.upinClick = function (e, index) {
        console.log(e);
        console.log(index);
        // this.tabIndex = index;
        e.stopPropagation();
    };
    DashboardComponent.prototype.dropdownListProject = function (e) {
        this.popupDropdownVisible = !this.popupDropdownVisible;
        e.stopPropagation();
    };
    DashboardComponent.prototype.showAllProject = function () {
        this.popupProjectsVisible = true;
    };
    DashboardComponent.prototype.clickShowFormProject = function (e) {
        this.popupAddVisible = true;
        this.project = new ProjectViewModel();
        this.project.startDate = new Date();
        this.project.status = this.lookupData[0].id;
    };
    DashboardComponent.prototype.addProject = function (e) {
        var _this = this;
        this.pmServive.addProject(this.project).subscribe(function (item) {
            _this.project.id = item.data;
            _this.projects.push(_this.project);
            _this.popupAddVisible = false;
            _this.popupDropdownVisible = false;
            _this.notification(item.message, 'success', 3000);
        });
    };
    DashboardComponent.prototype.removeProject = function (e) {
        var _this = this;
        this.pmServive.deleteProject(e.data.id).subscribe(function (item) {
            if (_this.tabIndex === _this.projects.length) {
                _this.tabIndex = 0;
            }
            _this.notification(item.message, 'success', 3000);
            _this.popupDropdownVisible = false;
        });
    };
    DashboardComponent.prototype.editProject = function (e) {
        var _this = this;
        this.project = __assign(__assign({}, e.oldData), e.newData);
        this.pmServive.updateProject(this.project).subscribe(function (item) {
            _this.popupDropdownVisible = false;
            _this.notification(item.message, 'success', 3000);
        });
    };
    DashboardComponent.prototype.notification = function (mess, type, time) {
        notify({
            message: mess,
            position: {
                my: 'center bottom',
                at: 'center bottom'
            }
        }, type, time);
    };
    __decorate([
        ViewChild('formProject')
    ], DashboardComponent.prototype, "form", void 0);
    __decorate([
        ViewChild('navTab', { static: false })
    ], DashboardComponent.prototype, "tab", void 0);
    DashboardComponent = __decorate([
        Component({
            selector: 'app-md-dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map