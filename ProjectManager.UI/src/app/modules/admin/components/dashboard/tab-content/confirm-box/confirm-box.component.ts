import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxPopoverComponent } from 'devextreme-angular';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('popoverConfirm', { static: true }) popoverConfirm: DxPopoverComponent;

  constructor() { }
  ngOnInit() {
  }

  onClickBtn(e){
    this.onConfirm.emit(e);
    this.hide();
  }

  show(e) {
    this.popoverConfirm.instance.show(e);
  }
  hide(){
    this.popoverConfirm.instance.hide();
  }
}
