import { Project } from '@/classes/classes';
import type {ITableProps} from '@/types/types';
import Cell from '../Cell';

export default function MemberProjectListTable({ filter, manager, onClick }: ITableProps) {
  let memberProjects: Project[] = [];

  if (filter.label === 'All') {
    manager.projects.map(project => {
      memberProjects = memberProjects.concat(project)
    })
  } else {
    const member = manager.getMember(filter.id);
    if (member) {
      member.projects.map(project => {
        memberProjects = memberProjects.concat(project)
      });
    }
  }

  return (
    <>
      <div className="text-2xl mb-2">
        {filter.label === 'All' ? 'All Members' : `${filter.label}'s Project List`}
      </div>
      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="text-left bg-gray-50 border-b">
            <tr>
              {['Project', 'Assigned To', 'Estimated Hours'].map(header => (
                <th className="px-6 py-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {memberProjects.map(project => {
              return <tr onClick={onClick}>
                <Cell>{project.title}</Cell>
                <Cell><>{project.members.map(m => <span>{m.name}</span>)}</></Cell>
                <Cell>{project.totalHours}</Cell>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
