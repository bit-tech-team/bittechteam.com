import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axiosClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password/`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="font-black text-6xl capitalize">
        <span className="text-orange-500">Recupera</span>{" "}
        <span className="text-red-500">tu</span>{" "}
        <span className="text-sky-500">acceso</span>{" "}
        <span className="text-orange-500">y</span>{" "}
        <span className="text-red-500">no</span>{" "}
        <span className="text-sky-500">pierdas</span>{" "}
        <span className="text-orange-500">tus</span>{" "}
        <span className="text-red-500">Proyectos</span>{" "}
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            type="email"
            placeholder="Introduzca su email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-orange-500 w-full mb-5 py-3 text-white uppdercase font-bold rounded hover:cursor-pointer hover:bg-orange-600 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrarse"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
