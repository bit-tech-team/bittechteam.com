import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
