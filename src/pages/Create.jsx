import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { create } from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';

export default function Create() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (recipe) => {
    const created = await create(recipe, user.id);
    navigate(`/recipes/${created.id}`);
  };

  return (
    <RecipeForm
      title="Нова рецепта"
      initialValues={{ title: '', description: '', ingredients: '', instructions: '', image_url: '' }}
      submitLabel="Създай"
      onSubmit={onSubmit}
    />
  );
}