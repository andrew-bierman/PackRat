import { describe, expect, it } from 'vitest';
import { templateCategoryIcon, templateSubtitle } from '../templateSubtitle';

const words = { itemWord: 'item', itemsWord: 'items' };

describe('templateSubtitle', () => {
  it('joins count, weight and capitalised category', () => {
    expect(
      templateSubtitle({ itemCount: 12, weightLabel: '4.2 kg', category: 'backpacking', ...words }),
    ).toBe('12 items · 4.2 kg · Backpacking');
  });

  it('uses the singular for one item and drops a missing weight and category', () => {
    expect(templateSubtitle({ itemCount: 1, weightLabel: null, category: null, ...words })).toBe(
      '1 item',
    );
    expect(templateSubtitle({ itemCount: 0, weightLabel: null, category: '', ...words })).toBe(
      '0 items',
    );
  });
});

describe('templateCategoryIcon', () => {
  it('maps known categories and falls back to a backpack', () => {
    expect(templateCategoryIcon('camping')).toBe('tent');
    expect(templateCategoryIcon('water sports')).toBe('waves');
    expect(templateCategoryIcon('bikepacking')).toBe('bag-personal');
    expect(templateCategoryIcon(undefined)).toBe('bag-personal');
  });
});
