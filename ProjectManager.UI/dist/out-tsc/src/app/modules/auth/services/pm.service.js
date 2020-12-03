import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var PmService = /** @class */ (function () {
    function PmService(apiService) {
        this.apiService = apiService;
        this.projectUrl = 'api/projects';
        this.usertUrl = 'api/users';
        this.taskUrl = 'api/tasks';
        this.todoUrl = 'api/todos';
    }
    PmService.prototype.getProjects = function () {
        return this.apiService.get(this.projectUrl);
    };
    PmService.prototype.addProject = function (project) {
        return this.apiService.post(this.projectUrl, project);
    };
    PmService.prototype.updateProject = function (project) {
        return this.apiService.update(this.projectUrl, project);
    };
    PmService.prototype.deleteProject = function (id) {
        var url = this.projectUrl + "/" + id;
        return this.apiService.delete(url);
    };
    PmService.prototype.getUsers = function () {
        return this.apiService.get(this.usertUrl);
    };
    PmService.prototype.addTask = function (task) {
        var url = this.taskUrl + "/task";
        return this.apiService.post(url, task);
    };
    PmService.prototype.editTask = function (task) {
        var url = this.taskUrl + "/task/" + task.id;
        return this.apiService.update(url, task);
    };
    PmService.prototype.addLstTask = function (listTask) {
        return this.apiService.post(this.taskUrl, listTask);
    };
    PmService.prototype.editLstTask = function (listTask) {
        var url = this.taskUrl + "/" + listTask.id;
        return this.apiService.update(url, listTask);
    };
    PmService.prototype.addLstTodo = function (listTodo) {
        return this.apiService.post(this.todoUrl, listTodo);
    };
    PmService.prototype.editLstTodo = function (listTodo) {
        var url = this.taskUrl + "/" + listTodo.id;
        return this.apiService.update(url, listTodo);
    };
    PmService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], PmService);
    return PmService;
}());
export { PmService };
//# sourceMappingURL=pm.service.js.map