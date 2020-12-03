import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TaskViewModel, UserViewModel } from '@app/modules/core/models/project';
import { DxListComponent, DxPopoverComponent } from 'devextreme-angular';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss']
})
export class TaskMenuComponent implements OnInit {
  @Output() selectStatusChange = new EventEmitter<number[]>();
  @Output() onSubmitedTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() addLstTodoTask: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @Input() task: TaskViewModel;

  @Input() isEdit: boolean;
  @Input() users: UserViewModel[];

  @ViewChild('popoverTodo', { static: true }) popoverTodo: DxPopoverComponent;
  @ViewChild('popoverStatus', { static: true }) popoverStatus: DxPopoverComponent;
  @ViewChild('popoverAssignMember', { static: true }) popoverAssignMember: DxPopoverComponent;
  @ViewChild('dxListMember', { static: false }) dxListMember: DxListComponent;

  selectUser: any = [];
  selectStatus: number[] = [];
  statusTask =
    [
      { id: 0, name: 'Not Started' },
      { id: 1, name: 'In Progress' },
      { id: 2, name: 'Completed' },
      { id: 3, name: 'Closed' },
    ];
  constructor() {
  }

  ngOnInit() { }

  submitTask(): void {
    // console.log(this.dxListMember.selectedItems);
    const [status] = this.selectStatus;
    if (status && this.task.status !== status){
      this.task.status = status;
    }
    this.task.statusTaskString = this.statusTask[this.task.status].name;
    this.onSubmitedTask.emit();
  }

  addLstTodo(inputAddLstTodo: ElementRef): void {
    this.popoverTodo.instance.hide();
    this.addLstTodoTask.emit(inputAddLstTodo);
  }

  showPopoverTodo(e) {
    this.popoverTodo.visible = !this.popoverTodo.visible;
    if (this.popoverTodo.visible) {
      this.popoverTodo.instance.show(e.toElement);
    }
  }
  showPopoverStatus(e) {
    this.popoverStatus.visible = !this.popoverStatus.visible;
    this.selectStatus = [this.task.status];
    if (this.popoverStatus.visible) {
      this.popoverStatus.instance.show(e.toElement);
    }
  }
  showPopoverMember(e) {
    this.popoverAssignMember.visible = !this.popoverAssignMember.visible;
    this.selectUser = this.task.members.map(u => u.id);
  }
}
