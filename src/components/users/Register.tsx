import { useState } from "react";
import { AxiosResponse } from "axios";
import useUserStore from "../../state/userStore";
import { useNavigate } from "react-router";
import useApi from "../../hooks/useApi";
import Header from "../Header";
import { RegisterDto, AuthResponse } from "../../schemes";

function Register() {
  const [registerState, setRegisterState] = useState<RegisterDto>({
    username: "",
    password: "",
    email: "",
  });
  const userStore = useUserStore();
  const navigate = useNavigate();
  const { api } = useApi();
  async function register() {
    try {
      let res: AxiosResponse<AuthResponse> = await api.post<AuthResponse>(
        "/users/reg",
        registerState
      );
      if (res.status == 200) {
        userStore.setToken(res.data.token);
        navigate("/home");
      }
    } catch (error) {}
  }
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Header></Header>

      <form className="w-[30vw] mt-[10vw] flex flex-col justify-start items-start border border-gray-300 p-[1vw] rounded">
        <label className="text-3xl mb-[1vw] mt-[1vw]">Логин</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={registerState.username}
          placeholder="Введите логин"
          onChange={(e) =>
            setRegisterState({ ...registerState, username: e.target.value })
          }
        ></input>
        <label className="text-3xl mb-[1vw] mt-[1vw]">Пароль</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={registerState.password}
          placeholder="Введите пароль"
          onChange={(e) =>
            setRegisterState({ ...registerState, password: e.target.value })
          }
        ></input>
        <label className="text-3xl mb-[1vw] mt-[1vw]">Почта</label>
        <input
          className="text-2xl w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-200"
          value={registerState.email}
          placeholder="Введите почту"
          onChange={(e) =>
            setRegisterState({ ...registerState, email: e.target.value })
          }
        ></input>
        <button
          className="bg-red-900 text-white px-4 py-2 rounded mt-[1vw]"
          onClick={(e) => {
            e.preventDefault();
            register();
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Register;
