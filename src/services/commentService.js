import { supabase } from './supabaseClient';

export async function getByRecipe(recipeId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('recipe_id', recipeId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function create(recipeId, content, user) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      recipe_id: recipeId,
      content,
      author_id: user.id,
      author_email: user.email,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function remove(id) {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw error;
}