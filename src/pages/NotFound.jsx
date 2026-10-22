import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section>
      <h1>404 - Страницата не е намерена</h1>
      <Link to="/">Към началото</Link>
    </section>
  );
}