import { Injectable } from '@angular/core';
import {
  BaseResponse, CommentViewModel, ListTaskViewModel, ListTodoViewModel,
  ProjectViewModel, TaskViewModel, TodoViewModel, UserViewModel
} from '@app/modules/admin/models/project';
import { ApiService } from '@app/modules/core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PmService {
  projectUrl = 'api/projects';
  usertUrl = 'api/users';
  taskUrl = 'api/tasks';
  todoUrl = 'api/todos';
  commentUrl = 'api/comments'

  constructor(
    private apiService: ApiService,
  ) { }

  getProjects(): Observable<BaseResponse<ProjectViewModel[]>> {
    return this.apiService.get(this.projectUrl);
  }

  addProject(project: ProjectViewModel): Observable<BaseResponse<number>> {
    return this.apiService.post(this.projectUrl, project);
  }


  updateProject(project: ProjectViewModel): Observable<BaseResponse<number>> {
    return this.apiService.update(this.projectUrl, project);
  }

  deleteProject(id: number): Observable<BaseResponse<number>> {
    const url = `${this.projectUrl}/${id}`;
    return this.apiService.delete(url);
  }


  getUsers(): Observable<BaseResponse<UserViewModel[]>> {
    return this.apiService.get(this.usertUrl);
  }

  getTaskByTaskId(id: number): Observable<BaseResponse<TaskViewModel>> {
    const url = `${this.taskUrl}/task-item/${id}`;
    return this.apiService.get(url);
  }
  addTask(task: TaskViewModel): Observable<BaseResponse<number>> {
    const url = `${this.taskUrl}/task-item`;
    return this.apiService.post(url, task);
  }

  editTask(task: TaskViewModel): Observable<BaseResponse<number>> {
    const url = `${this.taskUrl}/task-item/${task.id}`;
    return this.apiService.update(url, task);
  }


  addLstTask(listTask: ListTaskViewModel): Observable<BaseResponse<number>> {
    return this.apiService.post(this.taskUrl, listTask);
  }

  editLstTask(listTask: ListTaskViewModel): Observable<BaseResponse<number>> {
    const url = `${this.taskUrl}/${listTask.id}`;
    return this.apiService.update(url, listTask);
  }


  addLstTodo(listTodo: ListTodoViewModel): Observable<BaseResponse<number>> {
    return this.apiService.post(this.todoUrl, listTodo);
  }

  editLstTodo(listTodo: ListTodoViewModel): Observable<BaseResponse<number>> {
    const url = `${this.todoUrl}/${listTodo.id}`;
    return this.apiService.update(url, listTodo);
  }

  delLstTodo(id: number): Observable<BaseResponse<number>> {
    const url = `${this.todoUrl}/${id}`;
    return this.apiService.delete(url);
  }




  addTodo(todo: TodoViewModel): Observable<BaseResponse<number>> {
    const url = `${this.todoUrl}/todo-item`;
    return this.apiService.post(url, todo);
  }
  editTodo(todo: TodoViewModel): Observable<BaseResponse<number>> {
    const url = `${this.todoUrl}/todo-item/${todo.id}`;
    return this.apiService.update(url, todo);
  }
  delTodo(id: number): Observable<BaseResponse<number>> {
    const url = `${this.todoUrl}/todo-item/${id}`;
    return this.apiService.delete(url);
  }

  getComments(): Observable<BaseResponse<CommentViewModel[]>> {
    return this.apiService.get(this.commentUrl);
  }

  addComment(comment: CommentViewModel): Observable<BaseResponse<number>> {
    return this.apiService.post(this.commentUrl, comment);
  }
  editComment(comment: CommentViewModel): Observable<BaseResponse<number>> {
    const url = `${this.commentUrl}/${comment.id}`;
    return this.apiService.update(url, comment);
  }
  delComment(id: number): Observable<BaseResponse<number>> {
    const url = `${this.commentUrl}/${id}`;
    return this.apiService.delete(url);
  }
}
