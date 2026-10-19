import { supabase } from './supabaseClient';

export async function getLikes(recipeId) {
  const { data, error } = await supabase
    .from('likes')
    .select('user_id')
    .eq('recipe_id', recipeId);
  if (error) throw error;
  return data.map((l) => l.user_id);
}

export async function like(recipeId, userId) {
  const { error } = await supabase
    .from('likes')
    .insert({ recipe_id: recipeId, user_id: userId });
  if (error) throw error;
}

export async function unlike(recipeId, userId) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('recipe_id', recipeId)
    .eq('user_id', userId);
  if (error) throw error;
}