import { __decorate } from "tslib";
import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ListTaskViewModel, ListTodoViewModel, TaskViewModel } from '@app/modules/core/models/project';
import notify from 'devextreme/ui/notify';
var TabContentComponent = /** @class */ (function () {
    function TabContentComponent(cdRef, pmServive) {
        this.cdRef = cdRef;
        this.pmServive = pmServive;
        this.isEdit = false;
        this.isFullScreen = false;
        this.popupTaskVisible = false;
        this.popoverStatusVisible = false;
        this.popoverTodoVisible = false;
        this.statusTask = [
            { id: 0, text: 'Not Started' },
            { id: 1, text: 'In Progress' },
            { id: 2, text: 'Completed' },
            { id: 3, text: 'Closed' },
        ];
    }
    TabContentComponent.prototype.ngOnInit = function () {
    };
    TabContentComponent.prototype.onResize = function (event) {
        if (event.target.outerWidth < 992) {
            this.isFullScreen = true;
        }
        else {
            this.isFullScreen = false;
        }
    };
    // onListReorder(e) {
    //   console.log(e);
    //   const list = this.project.tasks.splice(e.fromIndex, 1)[0];
    //   console.log(list);
    //   this.project.tasks.splice(e.toIndex, 0, list);
    //   // const status = this.statuses.splice(e.fromIndex, 1)[0];
    //   // this.statuses.splice(e.toIndex, 0, status);
    // }
    TabContentComponent.prototype.onTaskDragStart = function (e) {
        e.itemData = e.fromData.task[e.fromIndex];
    };
    TabContentComponent.prototype.onTaskDrop = function (e) {
        e.fromData.task.splice(e.fromIndex, 1);
        e.toData.task.splice(e.toIndex, 0, e.itemData);
        if (e.fromData.name !== e.toData.name) {
            this.task = e.itemData;
            this.task.listTaskId = e.toData.id;
            this.editTask(this.task);
        }
    };
    TabContentComponent.prototype.addLstTask = function (e) {
        var _this = this;
        if (!this.validateAddList.instance.validate().isValid) {
            return false;
        }
        this.lstTask = new ListTaskViewModel();
        this.lstTask.name = this.addLstInput.value;
        this.lstTask.projectId = this.project.id;
        this.pmServive.addLstTask(this.lstTask).subscribe(function (item) {
            _this.lstTask.id = item.data;
            _this.lstTask.task = [];
            _this.project.tasks.push(_this.lstTask);
            _this.notification(item.message, 'success', 3000);
            _this.addLstInput.value = '';
            console.log(_this.project);
        });
    };
    TabContentComponent.prototype.onClickEditNameLstTask = function (listTaskEdit) {
        this.lstTask = listTaskEdit;
        this.cdRef.detectChanges();
        this.nameInput.nativeElement.focus();
    };
    TabContentComponent.prototype.editNameLstTask = function (e) {
        var _this = this;
        if (this.lstTask.name === this.nameInput.nativeElement.value) {
            delete this.lstTask;
            return;
        }
        this.lstTask.name = this.nameInput.nativeElement.value;
        this.pmServive.editLstTask(this.lstTask).subscribe(function () { delete _this.lstTask; });
    };
    TabContentComponent.prototype.onClickEditTask = function (task) {
        this.isEdit = true;
        this.task = task;
        this.selectStatus = [task.status];
        this.popupTaskVisible = true;
    };
    TabContentComponent.prototype.onClickAddTask = function (lstTaskId) {
        this.isEdit = false;
        this.task = new TaskViewModel();
        this.task.listTaskId = lstTaskId;
        this.selectStatus = [0];
        this.popupTaskVisible = true;
    };
    TabContentComponent.prototype.submitTask = function (e) {
        if (!this.validationGroup.instance.validate().isValid) {
            return false;
        }
        this.task.status = this.selectStatus[0];
        if (this.isEdit) {
            this.editTask(this.task);
        }
        else {
            this.addTask(this.task);
        }
    };
    TabContentComponent.prototype.addTask = function (task) {
        var _this = this;
        this.pmServive.addTask(task).subscribe(function (item) {
            task.id = item.data;
            _this.project.tasks.find(function (lt) { return lt.id === task.listTaskId; }).task.push(task);
            _this.popupTaskVisible = false;
            _this.notification(item.message, 'success', 3000);
        });
    };
    TabContentComponent.prototype.editTask = function (task) {
        var _this = this;
        this.pmServive.editTask(task).subscribe(function () {
            _this.popupTaskVisible = false;
            task.statusTaskString = _this.statusTask[_this.selectStatus[0]].text;
        });
    };
    TabContentComponent.prototype.addLstTodo = function (inputValue) {
        var _this = this;
        this.lstTodo = new ListTodoViewModel();
        this.lstTodo.name = inputValue;
        this.lstTodo.taskId = this.task.id;
        this.pmServive.addLstTodo(this.lstTodo).subscribe(function (item) {
            _this.lstTodo.id = item.data;
            _this.task.todos.push(_this.lstTodo);
            _this.popoverTodoVisible = false;
            _this.inputTodo.nativeElement.value = '';
        });
    };
    TabContentComponent.prototype.notification = function (mess, type, time) {
        notify({
            message: mess,
            position: {
                my: 'center bottom',
                at: 'center bottom'
            }
        }, type, time);
    };
    __decorate([
        ViewChild('nameInput')
    ], TabContentComponent.prototype, "nameInput", void 0);
    __decorate([
        ViewChild('inputTodo')
    ], TabContentComponent.prototype, "inputTodo", void 0);
    __decorate([
        ViewChild('addLstInput', { static: false })
    ], TabContentComponent.prototype, "addLstInput", void 0);
    __decorate([
        ViewChild('validationGroup', { static: false })
    ], TabContentComponent.prototype, "validationGroup", void 0);
    __decorate([
        ViewChild('validateAddList', { static: false })
    ], TabContentComponent.prototype, "validateAddList", void 0);
    __decorate([
        Input()
    ], TabContentComponent.prototype, "project", void 0);
    __decorate([
        HostListener('window:resize', ['$event'])
    ], TabContentComponent.prototype, "onResize", null);
    TabContentComponent = __decorate([
        Component({
            selector: 'app-tab-content',
            templateUrl: './tab-content.component.html',
            styleUrls: ['./tab-content.component.scss']
        })
    ], TabContentComponent);
    return TabContentComponent;
}());
export { TabContentComponent };
//# sourceMappingURL=tab-content.component.js.map