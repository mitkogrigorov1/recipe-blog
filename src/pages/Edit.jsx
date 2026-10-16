import { useNavigate, useOutletContext } from 'react-router';
import { update } from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';

export default function Edit() {
  const { recipe } = useOutletContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await update(recipe.id, values);
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <RecipeForm
      title="Редакция на рецепта"
      initialValues={{
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image_url: recipe.image_url ?? '',
      }}
      submitLabel="Запази промените"
      onSubmit={onSubmit}
    />
  );
}