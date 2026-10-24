import * as Recipes from '../src/recipes';

const KEY = 'explaining-flow.recipes';
const SEED_KEY = 'explaining-flow.recipes.seedVersion';
const names = () => Recipes.all().map(r => r.name);

describe('recipe seeding', () => {
  beforeEach(() => localStorage.clear());

  it('bakes in the whole default set on a first visit', () => {
    Recipes.seedDefaults();
    expect(names()).toEqual(Recipes.DEFAULT_RECIPES.map(r => r.name));
    expect(localStorage.getItem(SEED_KEY)).toBe('2');
  });

  it('appends only the newer recipes for a returning visitor, keeping their deletions', () => {
    const v1 = Recipes.DEFAULT_RECIPES.slice(0, 11).filter(r => r.name !== '8x People');
    localStorage.setItem(KEY, JSON.stringify(v1));
    Recipes.seedDefaults();
    expect(names()).not.toContain('8x People');
    expect(names()).toContain('1 stage x 8 generalists');
    expect(names()).toHaveLength(10 + 7);
  });

  it('does nothing further once the visitor is on the current seed version', () => {
    Recipes.seedDefaults();
    Recipes.remove('2 stages x 4 pooled');
    Recipes.seedDefaults();
    expect(names()).not.toContain('2 stages x 4 pooled');
  });

  it('respects a visitor who deleted everything', () => {
    localStorage.setItem(KEY, '[]');
    localStorage.setItem(SEED_KEY, '2');
    Recipes.seedDefaults();
    expect(names()).toEqual([]);
  });
});
