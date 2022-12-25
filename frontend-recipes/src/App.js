import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { checkToken } from "store/userSlice";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Register from "pages/Register";
import Navbar from "components/Navbar/Navbar";
import CreateDish from "pages/CreateDish";
import DishesView from "pages/DishesView";
import DishView from 'pages/DishView';


function App() {
  const dispatch = useDispatch();
  dispatch(checkToken());

  const styles = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 10px"
  }

  return (
    <div className="App">
      <Navbar />
      <div style={styles}>
        <Routes>
          {/* РЕЦЕПТЫ */}
          <Route path="/" element={<DishesView />} />
          <Route path="/dishes/:id" element={<DishView />}/>
          <Route path="/create_dish" element={<CreateDish />} />
          {/* АДМИНКА */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* АВТОРИЗЦИЯ */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
