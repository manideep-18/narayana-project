
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import ScanVM from "./scanVM";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
            {/* <Route
            path="/"
            element={<Login />}
          /> */}
          <Route path="/vmpage" element={<ScanVM />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
