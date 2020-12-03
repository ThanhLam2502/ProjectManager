import { __decorate, __read, __spread } from "tslib";
import { NgModule } from '@angular/core';
//
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
//
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { BookingDetailComponent } from '@app/modules/admin/components/bookings/booking-detail/booking-detail.component';
import { PartnersDetailComponent } from '@app/modules/admin/components/partners/partners-detail/partners-detail.component';
import { SearchFormComponent } from '@app/modules/admin/components/shared/search-form/search-form.component';
import { BookingService, PartnerService } from '@app/modules/admin/services';
import { BoatService } from '@app/modules/admin/services/boat.services';
import { SharedModule } from '@app/shared/shared.module';
import { RouterOutletComponent, ThemeModule } from '@app/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { BoatsComponent } from './components/boats/boats.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartnersComponent } from './components/partners/partners.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UsersComponent } from './components/users/users.component';
import { TabContentComponent } from './components/dashboard/tab-content/tab-content.component';
import { DxScrollViewModule, DxSortableModule } from 'devextreme-angular';
var PROVIDERS = [
    BookingService,
    PartnerService,
    BoatService
];
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        NgModule({
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
                            },
                            {
                                path: 'bookings',
                                component: BookingsComponent
                            },
                            {
                                path: 'users',
                                component: UsersComponent
                            },
                            {
                                // To fix the top menu issue
                                path: 'boats',
                                component: RouterOutletComponent,
                                children: [
                                    { path: '', redirectTo: 'partners', pathMatch: 'full' },
                                    {
                                        path: 'partners',
                                        component: PartnersComponent
                                    },
                                    {
                                        path: 'list',
                                        component: BoatsComponent
                                    },
                                    {
                                        path: 'schedule',
                                        component: ScheduleComponent
                                    }
                                ]
                            },
                            {
                                path: 'revenue',
                                component: RevenueComponent
                            }
                        ]
                    }
                ]),
            ],
            declarations: [
                DashboardComponent,
                BookingsComponent,
                AdminComponent,
                UsersComponent,
                PartnersComponent,
                BoatsComponent,
                ScheduleComponent,
                RevenueComponent,
                BookingDetailComponent,
                PartnersDetailComponent,
                SearchFormComponent,
                TabContentComponent
            ],
            providers: __spread(PROVIDERS)
        })
    ], AdminModule);
    return AdminModule;
}());
export { AdminModule };
//# sourceMappingURL=admin.module.js.map