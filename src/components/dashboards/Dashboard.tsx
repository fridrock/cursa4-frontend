import { DashboardDto } from "../../schemes";

interface DashboardProps {
  dashboard: DashboardDto;
  patch: () => Promise<void>;
  del: (id?: string) => Promise<void>;
  choose: () => void;
  choosen: boolean;
}

export default function Dashboard({
  dashboard,
  patch,
  del,
  choose,
  choosen,
}: DashboardProps) {
  let style = `${
    choosen ? "bg-[white]" : ""
  } border-t border-b border-white h-[10vh] flex justify-center items-center flex-col`;
  return (
    <div
      className={style}
      onClick={(e) => {
        choose();
      }}
    >
      <p className={`${choosen ? "text-black" : "text-white"} text-3xl`}>
        {dashboard.name}
      </p>
      {choosen && (
        <div className="mt-[1vw]">
          <button
            className="bg-red-900 text-white px-4 py-2 rounded"
            onClick={(e) => patch()}
          >
            Редактировать
          </button>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded ml-[1vw]"
            onClick={(e) => del(dashboard.dashboardId)}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
