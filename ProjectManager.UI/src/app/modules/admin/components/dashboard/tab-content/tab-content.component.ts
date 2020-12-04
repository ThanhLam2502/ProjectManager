import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PmService } from '@app/modules/admin/services/pm.service';
import { CommentViewModel, ListTaskViewModel, ListTodoViewModel, ProjectViewModel, TaskViewModel, TodoViewModel, UserViewModel } from '@app/modules/admin/models/project';
import { DxPopupComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent implements OnInit {
  @Input() project: ProjectViewModel;
  @Input() users: UserViewModel[];

  @ViewChild('popupTask') popupTask: DxPopupComponent;
  @ViewChild('validationGroup', { static: false }) validationGroup: DxValidationGroupComponent;
  @ViewChild('confirmBox', { static: false }) confirmBox: ConfirmBoxComponent;

  //#region variable
  commentItem: CommentViewModel;
  taskItem: TaskViewModel;
  selectModel: ListTodoViewModel | TodoViewModel | CommentViewModel;

  isEdit: boolean = false;
  isVidsibleAddNewCmt = false;
  isVisibleTaskMenu: boolean = false;
  //#endregion

  constructor(
    private pmServive: PmService,
  ) { }

  ngOnInit() {
  }

  //#region responsive
  showTaskMenu(e): void {
    this.isVisibleTaskMenu = !this.isVisibleTaskMenu;
  }

  //#region event drag & drop task
  onTaskDragStart(e) {
    e.itemData = e.fromData.task[e.fromIndex];
  }

  onTaskDrop(e) {
    e.fromData.task.splice(e.fromIndex, 1);
    e.toData.task.splice(e.toIndex, 0, e.itemData);
    if (e.fromData.id !== e.toData.id) {
      this.taskItem = e.itemData;
      this.taskItem.listTaskId = e.toData.id;
      this.editTask(this.taskItem);
    }
  }
  //#endregion

  //#region form add || edit task
  submitTask() {
    if (!this.validationGroup.instance.validate().isValid) {
      return false;
    }
    if (this.isEdit) {
      this.editTask(this.taskItem);
    } else {
      this.addTask(this.taskItem);
    }
  }

  onClickEditTask(task: TaskViewModel) {
    // get taskInfo
    this.pmServive.getTaskByTaskId(task.id).subscribe((item) => {
      this.taskItem = item.data;
      this.popupTask.instance.show();
    });
  }

  editTask(task: TaskViewModel): void {
    this.pmServive.editTask(task).subscribe(
      item => {
        this.notification(item.message, 'success', 3000);
      }
    );
  }

  onClickAddTask(ltTaskId: number) {
    this.isEdit = false;
    this.taskItem = new TaskViewModel({
      listTaskId: ltTaskId,
      todos: [],
      status: 0,
    });
    this.popupTask.instance.show();
  }
  addTask(task: TaskViewModel): void {
    this.pmServive.addTask(task).subscribe(
      item => {
        task.id = item.data;
        this.project.tasks.find(lt => lt.id === task.listTaskId).task.push(task);

        this.popupTask.instance.hide();
        this.notification(item.message, 'success', 3000);
      }
    );
  }
  //#endregion

  //#region edit
  onClickEditNameLstTask(lsTask, inputEditLstTask): void {
    lsTask.isEditing = true;
    setTimeout(() => {
      inputEditLstTask.focus();
    }, 100);
  }
  editNameLstTask(e, lsTask): void {
    if (e.target.value === '' || lsTask.name === e.target.value)
      return;
    lsTask.name = e.target.value;
    this.pmServive.editLstTask(lsTask).subscribe(
      () => {
        lsTask.isEditing = false;
      }
    );
  }

  onClickEditLstTodo(e, lsTodo, inputElement): void {
    e.stopPropagation();
    lsTodo.isEditing = true;
    setTimeout(() => {
      inputElement.focus();
    }, 100);

  }
  editLstTodoName(e, lsTodo): void {
    if (e.target.value === '' || lsTodo.name === e.target.value) {
      return;
    }
    lsTodo.name = e.target.value;
    this.pmServive.editLstTodo(lsTodo).subscribe(
      () => {
        lsTodo.isEditing = false;
      }
    );
  }

  editTodoComplete(e, todo): void {
    todo.isComplete = e.target.checked;
    this.pmServive.editTodo(todo).subscribe(
      () => {
        this.setPercent(todo.listTodoId);
      }
    );
  }

  editTodoName(e, todo): void {
    if (e.target.value === '') {
      return;
    }
    todo.name = e.target.value;
    this.pmServive.editTodo(todo).subscribe(
      () => {
        this.setPercent(todo.listTodoId);
        todo.isEditing = false;
      }
    );
  }

  onCLickEditTodo(inputElement, todo): void {
    todo.isEditing = true;
    setTimeout(() => {
      inputElement.focus();
    }, 100);
  }
  //#endregion

  //#region delete
  onClickDelLstTodo(e, lsTodo: ListTodoViewModel) {
    e.stopPropagation();
    this.selectModel = new ListTodoViewModel(lsTodo);
    this.confirmBox.show(e.currentTarget);
  }
  onClickDelTodo(e, todo: TodoViewModel) {
    this.selectModel = new TodoViewModel(todo);
    this.confirmBox.show(e.currentTarget);
  }
  onClickDelCmt(e, comment: CommentViewModel) {
    this.selectModel = new CommentViewModel(comment);
    this.confirmBox.show(e.currentTarget);
  }

  onClickConfirm(e) {
    if (e === false)
      return;
    const nameClass = this.selectModel.constructor.name;
    if (nameClass === 'ListTodoViewModel') {
      this.deleteLstTodo(<ListTodoViewModel>this.selectModel);
    }
    if (nameClass === 'TodoViewModel') {
      this.deleteTodo(<TodoViewModel>this.selectModel);
    }
    if (nameClass === 'CommentViewModel') {
      this.deleteComment(<CommentViewModel>this.selectModel);
    }
    this.confirmBox.hide();
  }

  deleteLstTodo(lsTodo: ListTodoViewModel) {
    this.pmServive.delLstTodo(lsTodo.id).subscribe(
      item => {
        this.taskItem.todos = this.taskItem.todos.filter(lt => lt.id !== item.data);
        this.notification(item.message, 'success', 3000);
      }
    );
  }
  deleteTodo(todo: TodoViewModel) {
    this.pmServive.delTodo(todo.id).subscribe(
      item => {
        const lsTodo: ListTodoViewModel = this.taskItem.todos.find(t => t.id === todo.listTodoId);
        lsTodo.todo = lsTodo.todo.filter(x => x.id !== item.data);
        this.setPercent(lsTodo.id);
        this.notification(item.message, 'success', 3000);
      }
    );
  }
  deleteComment(comment: CommentViewModel) {
    this.pmServive.delComment(comment.id).subscribe(
      item => {
        if (comment.parentId === null)
          this.taskItem.comments = this.taskItem.comments.filter(c => c.id !== item.data);
        else {
          const cmtDelParent = this.taskItem.comments.find(cmt => cmt.id === comment.parentId);
          cmtDelParent.inverseParent = cmtDelParent.inverseParent.filter(c => c.id !== item.data);
        }
        this.notification(item.message, 'success', 3000);
      }
    );
  }
  //#endregion

  //#region add
  addLstTask(inputAddLstTask) {
    const lsTask = new ListTaskViewModel({
      name: inputAddLstTask.value,
      projectId: this.project.id,
      task: [],
    });
    this.pmServive.addLstTask(lsTask).subscribe(
      item => {
        lsTask.id = item.data;
        this.project.tasks.push(lsTask);

        inputAddLstTask.value = '';
        this.notification(item.message, 'success', 3000);
      }
    );
  }

  addLstTodo(inputAddLstTodo): void {
    const lsTodo = new ListTodoViewModel({
      name: inputAddLstTodo.value,
      taskId: this.taskItem.id,
      percent: 0,
      todo: [],
    });
    this.pmServive.addLstTodo(lsTodo).subscribe(
      item => {
        lsTodo.id = item.data;
        this.taskItem.todos.push(lsTodo);
        inputAddLstTodo.value = '';
      }
    );
  }

  addTodo(e, lstTodoId: number): void {
    const todo = new TodoViewModel({
      name: e.target.value,
      isComplete: false,
      listTodoId: lstTodoId,
    });

    this.pmServive.addTodo(todo).subscribe(
      item => {
        todo.id = item.data;
        this.taskItem.todos.find(t => t.id === lstTodoId).todo.push(todo);
        e.target.value = '';
      }
    );
  }
  //#endregion

  //#region comment
  onClickNewCmt(): void {
    this.isVidsibleAddNewCmt = true;
    this.commentItem = new CommentViewModel({
      userId: 10,
      parentId: null,
      taskId: this.taskItem.id,
      inverseParent: [],
    });
  }
  onClickRepComment(comment: CommentViewModel): void {
    this.commentItem = new CommentViewModel({
      userId: 10,
      parentId: comment.id,
      taskId: this.taskItem.id,
      inverseParent: [],
    });
    comment.isRep = true;
    comment.isEdit = false;
  }
  addComment(e: CommentViewModel): void {
    // Cancel edit
    this.isVidsibleAddNewCmt = false;
    if (e.isEdit === false) {
      return;
    }
    // Add New comment
    this.pmServive.addComment(e).subscribe(item => {
      e.id = item.data;
      e.isEdit = false;
      this.setUserName(e);
      this.setUserImg(e);
      this.taskItem.comments.push(e);
    })
  }

  addRepComment(e: CommentViewModel): void {
    let commentParent = this.taskItem.comments.find(cmt => cmt.id === e.parentId)
    commentParent.isRep = false;
    if (e.isEdit === false) {
      return;
    }
    this.pmServive.addComment(e).subscribe(item => {
      e.id = item.data;
      e.isEdit = false;
      this.setUserName(e);
      this.setUserImg(e);
      commentParent.inverseParent.push(e);
    })
  }

  editComment(e: CommentViewModel): void {
    if (e.isEdit === false) {
      return;
    }
    this.pmServive.editComment(e).subscribe(() => {
      e.isEdit = false;
    });
  }
  //#endregion

  //#region private funtion
  private setPercent(listTodoId: number): void {
    const lsTodo = this.taskItem.todos.find(x => x.id === listTodoId); // type listTodoViewModel
    if (lsTodo.todo.length !== 0)
      lsTodo.percent = lsTodo.todo.filter(x => x.isComplete === true).length * 100 / lsTodo.todo.length;
    else
      lsTodo.percent = 0;
  }

  private notification(mess: string, type: string, time: number): void {
    notify({
      message: mess,
      position: {
        my: 'center bottom',
        at: 'center bottom'
      }
    }, type, time);
  }

  private setUserName(comment: CommentViewModel): void {
    comment.userName = "TL";
  }
  private setUserImg(comment: CommentViewModel): void {
    comment.img = "/assets/images/img.jpg";
  }
  //#endregion
}
