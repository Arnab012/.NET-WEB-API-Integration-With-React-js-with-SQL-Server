import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <div>
            Not Found
            <p>
              <a href="/">Back to home</a>
            </p>
          </div>
        }
      />
    </Route>
  )
);

function App() {
  const IsloggedIn = localStorage.getItem("user");
  return (
    <section>
      <div className="top-nav">
        {IsloggedIn ? (
          <span className="item-holder">
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
            <span>Logout</span>
          </span>
        ) : (
          <span className="itemholder">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </span>
        )}
      </div>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
