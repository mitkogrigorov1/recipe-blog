import { supabase } from './supabaseClient';

export async function getAll() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getOne(id) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function create(recipe, userId) {
  const { data, error } = await supabase
    .from('recipes')
    .insert({ ...recipe, author_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function update(id, recipe) {
  const { data, error } = await supabase
    .from('recipes')
    .update(recipe)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function remove(id) {
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw error;
}