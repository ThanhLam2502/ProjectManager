import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommentViewModel } from '@app/modules/admin/models/project';
import { DxHtmlEditorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss']
})
export class WriteCommentComponent implements OnInit {
  @Input() comment: CommentViewModel;
  @Output() onCommentChange = new EventEmitter<CommentViewModel>();


  @ViewChild('writeCmt') writeCmt: DxHtmlEditorComponent;


  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.writeCmt.instance.focus(); }, 100);
  }

  onClickBtnYes(){
    if(this.comment.cmt === this.writeCmt.value)
      return;
    this.comment.isEdit = true;
    this.comment.cmt = this.writeCmt.value;
    this.onCommentChange.emit(this.comment);
  }
  onClickBtnNo(){
    this.comment.isEdit = false;
    this.onCommentChange.emit(this.comment);
  }
}

  // @Output() onCommentChange = new EventEmitter<CommentViewModel>();
  // @Input()
  // get onComment(): CommentViewModel {
  //   return this._onComment;
  // }
  // set onBoarding(value: CommentViewModel) {
  //   this._onComment = value;
  //   this.onCommentChange.emit(value);
  // }
  // private _onComment: CommentViewModel
