import { ITableProps, ITask } from "@/types/types";
import Cell from "../Cell";

export default function ProjectTaskListTable({ filter, manager, onClick }: ITableProps) {
  let tasks: ITask[] = [];
  let totalHours = 0;

  if (filter.label === 'All') {
    manager.projects.forEach(project => {
      project.tasks.forEach(task => {
        totalHours += task.estimatedHours;
        tasks.push({ ...task, projectTitle: project.title });
      })
    })
  } else {
    const project = manager.getProject(filter.id);
    if (project) {
      project.tasks.map(task => {
        totalHours += task.estimatedHours;
        tasks.push({ ...task, projectTitle: project.title })
      })
    }
  }

  return (
    <>
      <div className="text-2xl mb-2 flex justify-between items-center">
        <p>
          {filter.label === 'All' ? 'Complete Projects Task List' : `${filter.label} Tasks`}
        </p>
        <p>{totalHours} hours</p>
      </div>
      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="text-left bg-gray-50 border-b">
            <tr>
              {['Project', 'Task', 'Assigned To', 'Estimated Hours'].map(header => (
                <th className="px-6 py-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map(task => (
              <tr key={task.id} onClick={(e) => {
                e.stopPropagation();
                onClick()
              }}>
                <Cell>{task.projectTitle}</Cell>
                <Cell>{task.title}</Cell>
                <Cell>{task.assignedTo}</Cell>
                <Cell>{task.estimatedHours}</Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
