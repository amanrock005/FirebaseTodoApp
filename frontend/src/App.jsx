import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
