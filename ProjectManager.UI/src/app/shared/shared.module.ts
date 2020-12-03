import {ModuleWithProviders, NgModule} from '@angular/core';

import {ThemeModule} from '@app/theme';
import {ApiService, AppLoadService, AuthenticationService, DeviceDetectorService, ScreenService} from '@app/modules/core/services';
import {PopoverConfirmBoxComponent} from '@app/shared/components/popover-confirm-box/popover-confirm-box.component';
import {PopoverTitleComponent} from '@app/shared/components/popover-title/popover-title.component';

const PROVIDERS = [
    //
    ApiService,
    ScreenService,
    AppLoadService,
    DeviceDetectorService,
    AuthenticationService,
];

const COMPONENTS = [PopoverConfirmBoxComponent,
    PopoverTitleComponent];

@NgModule({
    imports: [
        ThemeModule
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...PROVIDERS],
        } as ModuleWithProviders;
    }
}
