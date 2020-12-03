import { __decorate, __read, __spread } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxAccordionModule, DxAutocompleteModule, DxButtonModule, DxMenuModule, DxChartModule, DxCheckBoxModule, DxColorBoxModule, DxToolbarModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxDropDownButtonModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule, DxNumberBoxModule, DxPivotGridModule, DxPopoverModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxSchedulerModule, DxScrollViewModule, DxSelectBoxModule, DxSliderModule, DxSwitchModule, DxTabPanelModule, DxTabsModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTooltipModule, DxTreeListModule, DxTreeViewModule, DxValidationGroupModule, DxValidationSummaryModule, DxValidatorModule, DxDrawerModule } from 'devextreme-angular';
import { DefaultLayoutComponent, SingleCardLayoutComponent, SidebarLayoutComponent } from './layouts';
import { ErrorComponent, FooterComponent, HeaderComponent, SideNavigationMenuComponent, PopupContainerComponent, UserPanelComponent, RouterOutletComponent } from './components';
import { AutoFocusInputDirective } from './directives';
//
var DEVEXTREME_MODULES = [
    DxButtonModule, DxDropDownButtonModule, DxDrawerModule, DxMenuModule,
    DxToolbarModule, DxTextBoxModule, DxScrollViewModule, DxListModule, DxDataGridModule,
    DxTagBoxModule, DxValidatorModule, DxValidationGroupModule, DxValidationSummaryModule,
    DxCheckBoxModule, DxPopupModule, DxPopoverModule, DxTabPanelModule, DxTreeListModule,
    DxTextAreaModule, DxSelectBoxModule, DxDateBoxModule, DxChartModule, DxContextMenuModule,
    DxFormModule, DxSliderModule, DxNumberBoxModule, DxHtmlEditorModule, DxSchedulerModule,
    DxFileUploaderModule, DxAccordionModule, DxSwitchModule, DxPivotGridModule, DxTabsModule, DxLoadIndicatorModule,
    DxLoadPanelModule, DxTooltipModule, DxProgressBarModule, DxColorBoxModule,
    DxDropDownBoxModule, DxTreeViewModule, DxRadioGroupModule, DxAutocompleteModule
];
//
var BASE_MODULES = [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
];
// Components for this module only
var COMPONENTS = [
    UserPanelComponent,
    //
    HeaderComponent,
    SideNavigationMenuComponent,
    FooterComponent,
    ErrorComponent,
    PopupContainerComponent,
    RouterOutletComponent,
    //
    SingleCardLayoutComponent,
    SidebarLayoutComponent,
    DefaultLayoutComponent
];
//
var DIRECTIVES = [
    AutoFocusInputDirective
];
//
var PIPES = [];
var ThemeModule = /** @class */ (function () {
    function ThemeModule() {
    }
    ThemeModule = __decorate([
        NgModule({
            imports: __spread(DEVEXTREME_MODULES, BASE_MODULES),
            declarations: __spread(DIRECTIVES, PIPES, COMPONENTS),
            exports: __spread(DEVEXTREME_MODULES, BASE_MODULES, DIRECTIVES, PIPES, COMPONENTS)
        })
    ], ThemeModule);
    return ThemeModule;
}());
export { ThemeModule };
//# sourceMappingURL=theme.module.js.map