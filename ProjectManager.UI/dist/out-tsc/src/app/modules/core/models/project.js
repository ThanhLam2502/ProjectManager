var BaseResponse = /** @class */ (function () {
    function BaseResponse() {
    }
    return BaseResponse;
}());
export { BaseResponse };
var ProjectViewModel = /** @class */ (function () {
    function ProjectViewModel() {
    }
    return ProjectViewModel;
}());
export { ProjectViewModel };
var ListTaskViewModel = /** @class */ (function () {
    function ListTaskViewModel() {
    }
    return ListTaskViewModel;
}());
export { ListTaskViewModel };
var TaskViewModel = /** @class */ (function () {
    function TaskViewModel() {
    }
    return TaskViewModel;
}());
export { TaskViewModel };
var ListTodoViewModel = /** @class */ (function () {
    function ListTodoViewModel() {
        this.isCollapsed = true; // showCollapsed todo[]
    }
    Object.defineProperty(ListTodoViewModel.prototype, "percent", {
        get: function () {
            return 0; // this.todo?.filter(x => x.isComplete === true).length * 100 / this.todo?.length;
        },
        enumerable: false,
        configurable: true
    });
    return ListTodoViewModel;
}());
export { ListTodoViewModel };
var TodoViewModel = /** @class */ (function () {
    function TodoViewModel() {
    }
    return TodoViewModel;
}());
export { TodoViewModel };
//# sourceMappingURL=project.js.map