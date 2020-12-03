import { NgModule } from '@angular/core';
//
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
//
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SearchFormComponent } from '@app/modules/admin/components/shared/search-form/search-form.component';
import { BookingService, PartnerService } from '@app/modules/admin/services';
import { BoatService } from '@app/modules/admin/services/boat.services';
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
  BookingService,
  PartnerService,
  BoatService
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
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: DashboardComponent
          }
        ]
      }
    ]),
  ],
  declarations: [
    DashboardComponent,
    AdminComponent,
    SearchFormComponent,
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
