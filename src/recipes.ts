export type Recipe = {
  name: string;
  workload: string;
  workers: string;
  wipLimit: string;
  numberOfStories: string;
  random: boolean;
};

const KEY = 'explaining-flow.recipes';

const load = (): Recipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

const save = (recipes: Recipe[]) => localStorage.setItem(KEY, JSON.stringify(recipes));

const all = (): Recipe[] => load();

const find = (name: string): Recipe | undefined => load().find(r => r.name === name);

const upsert = (recipe: Recipe) => {
  if (!recipe.name.trim()) return;
  const recipes = load();
  const index = recipes.findIndex(r => r.name === recipe.name);
  if (index >= 0) recipes[index] = recipe;
  else recipes.push(recipe);
  save(recipes);
};

const remove = (name: string) => save(load().filter(r => r.name !== name));

export { all, find, upsert, remove };
