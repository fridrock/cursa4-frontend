import { NavLink, useNavigate } from "react-router";
import useUserStore from "../state/userStore";

export default function Header() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  function logout() {
    userStore.setToken("");
    navigate("/home");
  }
  return (
    <header className="z-10 fixed w-full flex justify-start items-center py-3 px-[10vw] bg-red-900">
      <NavLink className="font-black text-5xl text-[white]" to="/home">
        TODOAI
      </NavLink>
      {!userStore.token && (
        <NavLink to="/signin" className="ml-[auto] text-[white] text-2xl">
          Логин
        </NavLink>
      )}
      {!userStore.token && (
        <NavLink to="/signup" className="ml-[1.5vw] text-[white] text-2xl">
          Регистрация
        </NavLink>
      )}
      {userStore.token && (
        <button
          className="bg-white text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md ml-[auto]"
          onClick={() => logout()}
        >
          Выйти
        </button>
      )}
    </header>
  );
}
