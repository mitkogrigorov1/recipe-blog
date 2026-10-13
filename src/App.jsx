import { Routes, Route } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import PrivateRoute from './guards/PrivateRoute';
import GuestRoute from './guards/GuestRoute';
import Login from './pages/Login';
import Register from './pages/Register';

function Home() {
  return <h1>Блог за рецепти</h1>;
}

export default function App() {
  const { loading } = useAuth();

  if (loading) return <p>Зареждане...</p>;

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            {/* тук ще добавим /recipes/create и др. */}
          </Route>
        </Routes>
      </main>
    </>
  );
}