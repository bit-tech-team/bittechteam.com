import { BrowserRouter, Routes, Route } from "react-router-dom";

/* layouts */
import MainLayout from "./layouts/MainLayout";

/* main pages */
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
