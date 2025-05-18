import { useState } from "react";
import { DashboardDto } from "../../schemes";

interface DashboardForm {
  name: string;
  dashboardId?: string;
}

interface DashboardFormProps extends DashboardForm {
  perform: (data: DashboardDto) => void;
  close: () => void;
}

export default function DashboardForm(dashboardFormProps: DashboardFormProps) {
  let [dashboardForm, setDashboardForm] =
    useState<DashboardForm>(dashboardFormProps);
  return (
    <>
      <form className="absolute w-[30vw] mt-[10vw] flex flex-col justify-start items-start border border-gray-300 p-[1vw] rounded bg-[white]">
        <button
          className="bg-red-900 text-white px-4 py-2 rounded ml-[auto]"
          onClick={(e) => {
            e.preventDefault();
            dashboardFormProps.close();
          }}
        >
          Закрыть
        </button>
        <label className="text-3xl mb-[1vw] mt-[1vw]">Название доски</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={dashboardForm.name}
          placeholder="Введите название доски"
          onChange={(e) => {
            setDashboardForm({ ...dashboardForm, name: e.target.value });
          }}
        ></input>
        <button
          className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
          onClick={async (e) => {
            e.preventDefault();
            dashboardFormProps.perform({
              name: dashboardForm.name,
              dashboardId: dashboardForm.dashboardId
                ? dashboardForm.dashboardId
                : "",
            });
          }}
        >
          Создать
        </button>
      </form>
    </>
  );
}
