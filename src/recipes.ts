export type Recipe = {
  name: string;
  workload: string;
  workers: string;
  wipLimit: string;
  numberOfStories: string;
  random: boolean;
};

const KEY = 'explaining-flow.recipes';

// The Banana Software Company demo set — baked in so a fresh visitor gets a
// ready-made lecture series. Seeded only on first visit (see seedDefaults):
// deleting them stores '[]', which is respected — they don't resurrect.
const DEFAULT_RECIPES: Recipe[] = [
  { name: 'Base Team', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '100', random: true },
  { name: '2x People', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '100', random: true },
  { name: '4x People', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '100', random: true },
  { name: '8x People', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa, po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '100', random: true },
  { name: 'WIP throttling only', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa', wipLimit: '7', numberOfStories: '100', random: true },
  { name: 'Cross-skilling only', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'dev+ui, dev+ui, dev+qa, dev+po, ui+po, ui+qa, qa+po', wipLimit: '', numberOfStories: '100', random: true },
  { name: 'Cut Batch only', workload: 'po: 1, ui: 2, dev: 4, qa: 1', workers: 'po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '200', random: true },
  { name: 'WIP + cx2 skill + batch', workload: 'po: 1, ui: 2, dev: 4, qa: 1', workers: 'dev+ui, dev+ui, dev+qa, dev+po, ui+po, ui+qa, qa+po', wipLimit: '7', numberOfStories: '200', random: true },
  { name: 'WIP + cx3 skill + batch', workload: 'po: 1, ui: 2, dev: 4, qa: 1', workers: 'po+ui+dev, po+ui+dev, ui+dev+qa, ui+dev+qa, po+dev+qa, po+ui+qa, po+ui+dev', wipLimit: '7', numberOfStories: '200', random: true },
  { name: 'WIP + fullstack + batch', workload: 'po: 1, ui: 2, dev: 4, qa: 1', workers: 'fullstack, fullstack, fullstack, fullstack, fullstack, fullstack, fullstack', wipLimit: '7', numberOfStories: '200', random: true },
  { name: 'Base Team (noVar)', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, ui, ui, dev, dev, dev, qa', wipLimit: '', numberOfStories: '100', random: false },
  // The stage ladder (added 2026-10-24): eight people and 16 units of work per
  // story in every rung; only the number of handoffs changes.
  { name: '8 stages x 1 person', workload: 'po1: 1, po2: 1, ui1: 2, ui2: 2, dev1: 4, dev2: 4, qa1: 1, qa2: 1', workers: 'po1, po2, ui1, ui2, dev1, dev2, qa1, qa2', wipLimit: '', numberOfStories: '100', random: true },
  { name: '4 stages x 2 pooled', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, po, ui, ui, dev, dev, qa, qa', wipLimit: '', numberOfStories: '100', random: true },
  { name: '2 stages x 4 pooled', workload: 'front: 6, back: 10', workers: 'front, front, front, front, back, back, back, back', wipLimit: '', numberOfStories: '100', random: true },
  { name: '1 stage x 8 generalists', workload: 'all: 16', workers: 'all, all, all, all, all, all, all, all', wipLimit: '', numberOfStories: '100', random: true },
  { name: '8 stages x 1 person (WIP 8)', workload: 'po1: 1, po2: 1, ui1: 2, ui2: 2, dev1: 4, dev2: 4, qa1: 1, qa2: 1', workers: 'po1, po2, ui1, ui2, dev1, dev2, qa1, qa2', wipLimit: '8', numberOfStories: '100', random: true },
  { name: '4 stages x 2 pooled (WIP 8)', workload: 'po: 2, ui: 4, dev: 8, qa: 2', workers: 'po, po, ui, ui, dev, dev, qa, qa', wipLimit: '8', numberOfStories: '100', random: true },
  { name: '2 stages x 4 pooled (WIP 8)', workload: 'front: 6, back: 10', workers: 'front, front, front, front, back, back, back, back', wipLimit: '8', numberOfStories: '100', random: true },
];

// Bump when recipes are added to DEFAULT_RECIPES. Returning visitors get the
// additions appended; recipes they deleted from earlier versions stay deleted.
const SEED_VERSION = 2;
const SEED_KEY = 'explaining-flow.recipes.seedVersion';
const ADDED_IN: Record<number, string[]> = {
  2: ['8 stages x 1 person', '4 stages x 2 pooled', '2 stages x 4 pooled', '1 stage x 8 generalists',
      '8 stages x 1 person (WIP 8)', '4 stages x 2 pooled (WIP 8)', '2 stages x 4 pooled (WIP 8)'],
};

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

// First visit: the key has never been written, so bake in the whole demo set.
// Later visits: append only the recipes added since the version this browser
// last saw, so earlier deletions are respected.
const seedDefaults = () => {
  if (localStorage.getItem(KEY) === null) {
    save(DEFAULT_RECIPES);
  } else {
    const seen = Number(localStorage.getItem(SEED_KEY) || '1');
    const recipes = load();
    for (let v = seen + 1; v <= SEED_VERSION; v++) {
      for (const name of ADDED_IN[v] || []) {
        if (!recipes.some(r => r.name === name)) {
          const recipe = DEFAULT_RECIPES.find(r => r.name === name);
          if (recipe) recipes.push(recipe);
        }
      }
    }
    save(recipes);
  }
  localStorage.setItem(SEED_KEY, String(SEED_VERSION));
};

export { all, find, upsert, remove, seedDefaults, DEFAULT_RECIPES };
