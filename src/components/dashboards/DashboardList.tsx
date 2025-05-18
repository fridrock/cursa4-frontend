import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { DashboardDto } from "../../schemes";
import useApi from "../../hooks/useApi";
import { AxiosResponse } from "axios";
import DashboardForm from "./DashboardForm";
import TasksList from "../tasks/TasksList";

interface EditDashboard {
  name: string;
  dashboardId?: string;
  perform: (project: DashboardDto) => void;
}

export default function DashboardList() {
  const [dashboards, setDashboards] = useState<DashboardDto[]>([]);
  let [dashboardForm, setDashboardForm] = useState<EditDashboard | undefined>();
  let [dashboardChoosen, setDashboardChoosen] = useState<string | undefined>();
  const { api } = useApi();

  async function getDashboards() {
    try {
      const response: AxiosResponse<DashboardDto[]> = await api.get(
        "/dashboards"
      );
      setDashboards(response.data);
    } catch (error) {
      console.log(`error fetching dashboards ${error}`);
    }
  }

  async function createDashboard(dashboard: DashboardDto) {
    try {
      const response: AxiosResponse<DashboardDto> =
        await api.post<DashboardDto>("/dashboards", dashboard);
      setDashboards([...dashboards, response.data]);
      closeForm();
    } catch (error) {
      console.log(`error creating dashboard ${error}`);
    }
  }

  async function patchDashboard(dashboard: DashboardDto): Promise<void> {
    try {
      const response: AxiosResponse<DashboardDto> =
        await api.patch<DashboardDto>("/dashboards", dashboard);
      setDashboards([
        ...dashboards.filter((dsh) => dsh.dashboardId != dashboard.dashboardId),
        response.data,
      ]);
      closeForm();
    } catch (error) {
      console.log(`error patching dashboard ${error}`);
    }
  }

  async function deleteDashboard(id?: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await api.delete<void>(
        `/dashboards/${id}`
      );
      setDashboards(
        dashboards.filter((dashboard) => dashboard.dashboardId != id)
      );
      setDashboardChoosen(undefined);
    } catch (error) {
      console.log(`error deleting project with id ${id}`);
    }
  }

  function openEditDashboardForm(
    dashboard: DashboardDto,
    callback: (dto: DashboardDto) => void
  ) {
    setDashboardForm({ ...dashboard, perform: callback });
  }

  function closeForm() {
    setDashboardForm(undefined);
  }

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <>
      {dashboardForm ? (
        <DashboardForm
          name={dashboardForm.name}
          perform={dashboardForm ? dashboardForm.perform : createDashboard}
          dashboardId={dashboardForm.dashboardId}
          close={closeForm}
        ></DashboardForm>
      ) : (
        <></>
      )}
      <div className="w-full h-full flex justify-center items-center">
        <div className="fixed top-[0] left-[0] py-[5vw] w-[15vw] h-[100%] bg-red-900">
          <div className="flex justify-start items-center p-5">
            <p className="text-[white] text-3xl">Доски</p>
            <button
              className="bg-white text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md ml-[auto]"
              onClick={() => {
                openEditDashboardForm({ name: "" }, createDashboard);
              }}
            >
              Создать доску
            </button>
          </div>
          {dashboards.map((dashboard) => (
            <Dashboard
              key={dashboard.dashboardId}
              choosen={dashboardChoosen == dashboard.dashboardId}
              choose={() => {
                setDashboardChoosen((prevstate) => dashboard.dashboardId);
              }}
              dashboard={dashboard}
              del={deleteDashboard}
              patch={async () =>
                openEditDashboardForm(dashboard, patchDashboard)
              }
            />
          ))}
        </div>
        {dashboardChoosen ? (
          <>
            <TasksList dashboardId={dashboardChoosen}></TasksList>
          </>
        ) : (
          <h1 className="text-[black] self-center mt-[20vw] text-5xl">
            Выберите доску
          </h1>
        )}
      </div>
    </>
  );
}
