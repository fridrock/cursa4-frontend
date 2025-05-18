import { useNavigate } from "react-router";
import Header from "./Header";
import logo from "../img/Illustration.svg";
import useUserStore from "../state/userStore";
import ProjectList from "./dashboards/DashboardList";

function Home() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  return (
    <div className="flex justify-start items-center flex-col">
      <Header></Header>
      <div className="w-full h-full flex flex-col justify-start items-center">
        {!userStore.token ? (
          <>
            <h1 className="text-5xl mt-[10vw]">
              Добро пожаловать, войдите в аккаунт
            </h1>

            <button
              className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
              onClick={() => navigate("/signin")}
            >
              Логин
            </button>
            <button
              className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
              onClick={() => navigate("/signup")}
            >
              Регистрация
            </button>
          </>
        ) : (
          <>
            <ProjectList></ProjectList>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
