import { NgModule } from '@angular/core';
//
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
//
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ThemeModule } from '@app/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxScrollViewModule, DxSortableModule } from 'devextreme-angular';
import { AdminComponent } from './components/admin/admin.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmBoxComponent } from './components/dashboard/tab-content/confirm-box/confirm-box.component';
import { TabContentComponent } from './components/dashboard/tab-content/tab-content.component';
import { TaskMenuComponent } from './components/dashboard/tab-content/task-menu/task-menu.component';
import { WriteCommentComponent } from './components/dashboard/tab-content/write-comment/write-comment.component';

const PROVIDERS = [
];

@NgModule({
  imports: [
    MatIconModule,
    MatTabsModule,
    //
    ThemeModule,
    SharedModule,
    //
    DxScrollViewModule,
    DxSortableModule,
    FormsModule,
    NgbModule,
    //
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'projects', pathMatch: 'full' },
          {
            path: 'projects',
            component: DashboardComponent
          }
        ]
      }
    ]),
  ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    TabContentComponent,
    TaskMenuComponent,
    ConfirmBoxComponent,
    WriteCommentComponent
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class AdminModule {
}
