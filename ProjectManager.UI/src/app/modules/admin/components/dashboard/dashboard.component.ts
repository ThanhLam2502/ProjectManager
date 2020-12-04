import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { PmService } from '@app/modules/admin/services/pm.service';
import { ProjectViewModel, UserViewModel } from '@app/modules/admin/models/project';
import { DxPopoverComponent } from 'devextreme-angular';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-md-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('formProject') form: DxFormComponent;
  @ViewChild('navTab', { static: false }) tab: MatTabGroup;

  @ViewChild('popoverDropdown', { static: true }) popoverDropdown: DxPopoverComponent;
  @ViewChild('popupProjects', { static: true }) popupProjects: DxPopoverComponent;
  @ViewChild('popupAddProject', { static: true }) popupAddProject: DxPopoverComponent;

  users: UserViewModel[];
  projects: ProjectViewModel[];
  project: ProjectViewModel;

  tabIndex = 0;
  isCollapsed = false;
  isVissibleDropDown = false;
  lookupData = [
    { id: 0, name: 'Open' },
    { id: 1, name: 'Closed' },
  ];
  buttonOptions = {
    text: 'Submit',
    stylingMode: 'outlined',
    type: 'success',
    width: 120,
    useSubmitBehavior: 'true',
  };

  constructor(private pmServive: PmService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getProjects();
  }

  getProjects(): void {
    this.pmServive.getProjects().subscribe((item) => {
      this.projects = item.data;
      this.isVissibleDropDown = true;
    });
  }

  getUsers(): void {
    this.pmServive.getUsers().subscribe((item) => {
      this.users = item.data
    });
  }

  dblSelectTabProject(e): void {
    this.tabIndex = e.rowIndex;
    this.popoverDropdown.instance.hide();
    this.popupProjects.instance.hide();
  }

  upinClick(e: Event, index: number): void {
    console.log(e);
    console.log(index);
    // this.tabIndex = index;
    e.stopPropagation();
  }

  showAllProject(): void {
    this.popoverDropdown.instance.hide();
    this.popupProjects.instance.show();
  }

  clickShowFormProject(e): void {
    this.popupAddProject.instance.show();
    this.project = new ProjectViewModel({
      startDate: new Date(),
      status: this.lookupData[0].id,
    });
  }

  addProject(project: ProjectViewModel): void {
    this.pmServive.addProject(project).subscribe((item) => {
      this.project.id = item.data;
      this.projects.push(project);
      this.popupAddProject.instance.hide();
      this.notification(item.message, 'success', 3000);
    });
  }

  removeProject(e): void {
    this.pmServive.deleteProject(e.data.id).subscribe((item) => {
      if (this.tabIndex === this.projects.length) {
        this.tabIndex = 0;
      }
      this.notification(item.message, 'success', 3000);
    });
  }

  editProject(e): void {
    const project: ProjectViewModel = { ...e.oldData, ...e.newData };
    this.pmServive.updateProject(project).subscribe((item) => {
      this.notification(item.message, 'success', 3000);
    });
  }

  notification(mess: string, type: string, time: number): void {
    notify(
      {
        message: mess,
        position: {
          my: 'center bottom',
          at: 'center bottom',
        },
      },
      type,
      time
    );
  }
}
