import { BrowserRouter, Routes, Route } from "react-router-dom";

/* layouts */
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

/* provider */
import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectProvider";

/* auth routes */
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";
import ConfirmAccount from "./pages/auth/ConfirmAccount";

/* project pages */
import Projects from "./pages/project/Projects";
import NewProyect from "./pages/project/NewProyect";
import Project from "./pages/project/Project";
import EditProject from "./pages/project/EditProject";
import NewCollaborator from "./pages/project/NewCollaborator";

/* main pages */
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
            </Route>
          </Routes>
          <Routes>
            <Route path="/auth/magnus" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<SignIn />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/proyectos" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="crear-proyecto" element={<NewProyect />} />
              <Route
                path="nuevo-colaborador/:id"
                element={<NewCollaborator />}
              />
              <Route path="editar/:id" element={<EditProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
