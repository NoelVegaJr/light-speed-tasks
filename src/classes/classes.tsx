import type {ITask, IProject, IMember} from '@/types/types';

export class Project {
  private _id: string;
  private _title: string;
  private _tasks: Omit<ITask, 'projectTitle'>[]

  constructor(project: IProject) {
    this._id = project.id;
    this._title = project.title;
    this._tasks = project.tasks;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get tasks() {
    return this._tasks;
  }

  get members() {
    const memberIdSet = new Set();
    const members: Omit<IMember, 'projects'>[] = [];

    this.tasks.forEach(task => {
      if (!memberIdSet.has(task.assignedTo)) {
        memberIdSet.add(task.assignedTo);
        members.push({ id: task.assignedTo, name: task.assignedTo });
      }
    })
    return members;
  }

  get totalHours() {
    return this.tasks.reduce((hours, task) => hours += task.estimatedHours, 0);
  }
}




export class ProjectsManager {
  private _projects: Map<string, Project> = new Map();
  private _members: Map<string, IMember> = new Map();

  constructor(projects: Project[] = []) {
    projects.forEach(project => this.add(new Project(project)))
  }

  add(project: Project) {
    this._projects.set(project.id, project);

    project.members.map(m => {
      const existingMember = this._members.get(m.id);

      if (!existingMember) {
        this._members.set(m.id, { id: m.id, name: m.name, projects: [project] });
        return;
      } 
        const updatedMember = { ...existingMember, projects: [...existingMember.projects, project] }
        this._members.set(existingMember.id, updatedMember);
    })
  }

  get projects() {
    return Array.from(this._projects.values());
  }

  getProject(id: string) {
    return this._projects.get(id);
  }

  get members() {
    return Array.from(this._members.values());
  }

  getMember(id: string) {
    return this._members.get(id);
  }
}
