import { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { getOne } from '../services/recipeService';
import Spinner from '../components/Spinner';

export default function OwnerRoute() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getOne(id)
      .then((data) => { if (!cancelled) setRecipe(data); })
      .catch(() => { if (!cancelled) setNotFound(true); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Spinner />;
  if (notFound) return <Navigate to="/recipes" replace />;
  if (recipe.author_id !== user.id) return <Navigate to={`/recipes/${id}`} replace />;

  return <Outlet context={{ recipe }} />;
}