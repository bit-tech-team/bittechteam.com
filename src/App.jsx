import { BrowserRouter, Routes, Route } from "react-router-dom";

/* layouts */
import MainLayout from "./layouts/MainLayout";
import Cookies from "./pages/footer/Cookies";

/* main pages */
import Index from "./pages/Index";
import Navbar from "./components/UI/Navbar";
import Footer from "./components/UI/Footer";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsConditions from "./pages/footer/TermsConditions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
