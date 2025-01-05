import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/customer/Register";
import UpdateAddress from "./components/customer/UpdateAddress";
import { AlertModal } from "./components/Model";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route
            path="/foods"
            element={
              <AlertModal
                isOpen={true}
                onClose={false}
                title="Dynamic Alert Title"
                message="This is a dynamic message passed as a prop."
                buttonLabel="Got it!"
              />
            }
          />
          <Route path="/restaurants" element={<Home />} />

          {/*User routes*/}
          <Route path="/register" element={<Register />} />
          <Route path="/register?restaurants=true" element={<Register />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path="/updateAddress" element={<UpdateAddress />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
