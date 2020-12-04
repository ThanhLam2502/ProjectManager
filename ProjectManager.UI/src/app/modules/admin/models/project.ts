export class UserViewModel {
  id: number;
  name: string;
  img: string;
}

export class BaseResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export class ProjectViewModel {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: number;
  statusProjectString: string;
  assignTo: number;
  tasks: ListTaskViewModel[];

  constructor(init?: Partial<ProjectViewModel>) {
    Object.assign(this, init);
  }
}

export class ListTaskViewModel {
  id: number;
  name: string;
  projectId: number;
  task: TaskViewModel[];
  isEditing: boolean = false; // dang edit

  constructor(init?: Partial<ListTaskViewModel>) {
    Object.assign(this, init);
  }
}

export class TaskViewModel {
  id: number;
  name: string;
  description: string;
  attachFiles: string;
  status: number;
  statusTaskString: string;
  listTaskId: number;
  todos: ListTodoViewModel[];
  comments: CommentViewModel[];
  members: UserViewModel[];

  constructor(init?: Partial<TaskViewModel>) {
    Object.assign(this, init);
  }
}

export class ListTodoViewModel {
  id: number;
  name: string;
  percent: number;
  taskId: number;
  todo: TodoViewModel[];
  isCollapsed: boolean = false; // showCollapsed todo[]
  isEditing: boolean = false; // dang edit

  constructor(init?: Partial<ListTodoViewModel>) {
    Object.assign(this, init);
  }
}

export class TodoViewModel {
  id: number;
  name: string;
  isComplete: boolean;
  listTodoId: number;
  isEditing: boolean = false; // dang edit

  constructor(init?: Partial<TodoViewModel>) {
    Object.assign(this, init);
  }
}

export class CommentViewModel {
  id: number;
  cmt: string;
  userId: number;
  userName: string;
  img: string;
  taskId: number;
  parentId: number;
  inverseParent: CommentViewModel[];
  isEdit: boolean = false;
  isRep: boolean = false;
  isCollapsed: boolean = false;

  constructor(init?: Partial<CommentViewModel>) {
    Object.assign(this, init);
  }
}
