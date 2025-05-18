import { TaskDto } from "../../schemes";

interface TaskProps {
  task: TaskDto;
  patch: () => Promise<void>;
  del: (id?: string) => Promise<void>;
}

const statusMap = new Map();
statusMap.set("LOW", "Не важно");
statusMap.set("HIGH", "Важно");
statusMap.set("CRITICAL", "Критично");

export default function Task({ task, patch, del }: TaskProps) {
  return (
    <div className="w-[60vw] border-2 border-red-900 rounded-md p-[0.5vw] mb-[1vw]">
      <div className="flex justify-start items-end">
        <h2 className="text-5xl">{task.title}</h2>
        <p className="text-3xl ml-[1vw]">{statusMap.get(task.priority)}</p>
        <p className="text-3xl ml-[1vw]">{task.source}</p>
        <p className="text-2xl ml-[1vw]">
          Создано:
          {task.issued}
        </p>
        <p className="text-2xl ml-[1vw]">Надо сделать к: {task.deadline}</p>
      </div>
      <p className="text-2xl">Описание: {task.description}</p>
      <p className="text-2xl">Потрачено: {task.hoursSpent}</p>

      <button
        className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
        onClick={(e) => patch()}
      >
        Редактировать
      </button>
      <button
        className="bg-red-900 text-white px-4 py-2 rounded ml-[2vw] mt-[1vw]"
        onClick={(e) => del(task.taskId)}
      >
        Готово
      </button>
    </div>
  );
}
