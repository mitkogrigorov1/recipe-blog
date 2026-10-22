import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getAll } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import '../styles/recipes.css';

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getAll()
      .then((data) => { if (!cancelled) setLatest(data.slice(0, 3)); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <section>
      <div className="hero">
        <h1>🍳 Блог за рецепти</h1>
        <p>Споделяй любимите си рецепти и открий вдъхновение от други готвачи.</p>
        <Link to="/recipes" className="btn">Разгледай всички рецепти</Link>
      </div>

      {latest.length > 0 && (
        <>
          <h2>Последни рецепти</h2>
          <div className="recipe-grid">
            {latest.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </>
      )}
    </section>
  );
}