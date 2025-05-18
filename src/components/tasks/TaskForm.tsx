import { useState } from "react";
import { TaskDto } from "../../schemes";

interface TaskFormProps extends TaskDto {
  perform: (data: TaskDto) => void;
  close: () => void;
}

export default function TaskForm(taskFormProps: TaskFormProps) {
  let [task, setTask] = useState<TaskDto>({
    ...taskFormProps,
    hoursSpent: taskFormProps.hoursSpent ? taskFormProps.hoursSpent : 0,
  });

  return (
    <>
      <form className="absolute top-[20vh] left-[25vw] w-[50vw] p-[2vw] h-[60vh] flex flex-col rounded-[10px] bg-[#F3F3FF] border-2 border-red-500">
        <button
          className="bg-red-900 text-white px-4 py-2 rounded ml-[auto]"
          onClick={(e) => {
            e.preventDefault();
            taskFormProps.close();
          }}
        >
          Закрыть
        </button>
        <label className="text-3xl mb-[1vw]">Название задачи</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={task.title}
          placeholder="Введите название задачи"
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
        ></input>
        <label className="text-3xl mb-[1vw] mt-[1vw]">Описание задачи</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={task.description}
          placeholder="Введите описание задачи"
          onChange={(e) => {
            setTask({ ...task, description: e.target.value });
          }}
        ></input>
        <label className="text-3xl mb-[1vw] mt-[1vw]">
          Когда надо закончить
        </label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={task.deadline}
          placeholder="Введите дату формате 13.08.2025"
          onChange={(e) => {
            setTask({ ...task, deadline: e.target.value });
          }}
        ></input>
        <label className="text-3xl mb-[1vw] mt-[1vw]">Приоритет задачи</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="LOW">Не важно</option>
          <option value="HIGH">Важно</option>
          <option value="CRITICAL">Критичный</option>
        </select>

        <button
          className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
          onClick={async (e) => {
            e.preventDefault();
            taskFormProps.perform({
              ...task,
            });
          }}
        >
          Создать
        </button>
      </form>
    </>
  );
}
