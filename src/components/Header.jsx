import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import '../styles/header.css'

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='header'>
      <Link to="/">Начало</Link>
      <Link to="/recipes">Рецепти</Link>
      <span className='spacer' />
      {user ? (
        <>
          <Link to="/recipes/create">Нова рецепта</Link>
          <Link to={`/profile/${user.id}`}>Моите рецепти</Link>
          <span>{user.email}</span>
          <button onClick={logout}>Изход</button>
        </>
      ) : (
        <>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </header>
  );
}