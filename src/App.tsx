import { Routes, Route, Navigate } from "react-router";
import Home from "./components/Home";
import useUserStore from "./state/userStore";
import Auth from "./components/users/Auth";
import Register from "./components/users/Register";
import ProjectList from "./components/dashboards/DashboardList";
import TasksList from "./components/tasks/TasksList";
import "./App.css";

function App() {
  const userStore = useUserStore();
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/home" replace={true}></Navigate>}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectId" element={<TasksList />} />
      </Routes>
    </div>
  );
}

export default App;
