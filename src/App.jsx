import { Routes, Route } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import PrivateRoute from './guards/PrivateRoute';
import GuestRoute from './guards/GuestRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Details from './pages/Details';
import Create from './pages/Create';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import OwnerRoute from './guards/OwnerRoute';
import Profile from './pages/Profile';



export default function App() {
  const { loading } = useAuth();

  if (loading) return <p>Зареждане...</p>;

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Catalog />} />
          <Route path="/recipes/:id" element={<Details />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/recipes/create" element={<Create />} />
            <Route path="/recipes/:id/edit" element={<OwnerRoute />}>
             <Route index element={<Edit />} />
            </Route>
          </Route>
          <Route path="/profile/:userId" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">© 2026 Блог за рецепти</footer>
    </>
  );
}