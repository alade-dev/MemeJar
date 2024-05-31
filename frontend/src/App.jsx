import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./auth/Auth";
import Index from "./pages/Index";
// import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route path="/" element={<Index />} />
      </Routes>
      {/* <Index /> */}
    </Router>
  );
}

export default App;
