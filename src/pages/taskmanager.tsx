import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ISelectOption } from "@/types/types";
import { ProjectsManager } from "@/classes/classes";
import Select from "@/components/Select";
import ProjectTaskListTable from "@/components/ProjectTaskListTable";
import MemberProjectListTable from "@/components/MemberProjectListTable";
import { projects } from "./data";


const categoryOptions: ISelectOption[] = [{ label: 'Projects', id: '1' }, { label: 'Members', id: '2' }];
const baseFilterOptions: ISelectOption[] = [{ label: 'All', id: 'All' }]

export default function TaskManagerPage() {
  const manager = new ProjectsManager(projects);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [filterOptions, setFilterOptions] = useState(
      baseFilterOptions.concat(manager.projects.map(p => ({ label: p.title, id: p.id })))
    )
    
  const [filter, setFilter] = useState(filterOptions[0]);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    let options = baseFilterOptions;
    if (category.label === 'Projects') {
      options = options.concat(manager.projects.map(p => {
        return { label: p.title, id: p.id }
      }))
    } else {
      options = options.concat(manager.members.map(m => {
        return { label: m.name, id: m.id }
      }))
    }
    setFilterOptions(options);
    setFilter(options[0]);
  }, [category])

  const handleCategoryChange = (option: ISelectOption) => {
    setCategory(option);
  }
  const handleFilterChange = (option: ISelectOption) => {
    setFilter(option)
  }

  return (
    <div className="h-screen w-full flex overflow-hidden" onClick={() => setShowDrawer(false)}>
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-4 mb-6 ">
          <Select title="Category" selected={category} options={categoryOptions} onChange={handleCategoryChange} />
          <Select title="Filter" selected={filter} options={filterOptions} onChange={handleFilterChange} />
        </div>
        {category.label === 'Projects' && <ProjectTaskListTable onClick={() => setShowDrawer(true)} filter={filter} manager={manager} />}
        {category.label === 'Members' && <MemberProjectListTable onClick={() => setShowDrawer(true)} filter={filter} manager={manager} />}
        <div className="flex justify-end mt-4">
        <button className="bg-indigo-500 text-white py-1 px-4 font-semibold rounded shadow-md active:shadow-none">Create</button>
        </div>
      </div>
      <div className={`h-full border ${showDrawer ? 'w-1/4' : 'w-0'} transition-all duration-300`}>
        <div className="flex justify-end p-4">
          <XMarkIcon className="text-red-600 w-6 h-6" onClick={() => setShowDrawer(false)} />
        </div>
      </div>
    </div>
  )
}
