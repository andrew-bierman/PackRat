import { describe, expect, it } from 'vitest';
import { firstNameOf } from '../reportAuthors';

describe('firstNameOf', () => {
  it('uses the first name when the user has one', () => {
    expect(firstNameOf({ firstName: ' Sam ', name: 'Samantha Rivera' })).toBe('Sam');
  });

  it('falls back to the first word of the full name', () => {
    expect(firstNameOf({ firstName: null, name: '  Alex   Kim ' })).toBe('Alex');
  });

  it('treats a blank first name as missing', () => {
    expect(firstNameOf({ firstName: '  ', name: 'Jo Park' })).toBe('Jo');
  });

  it('is null when there is no name at all', () => {
    expect(firstNameOf({ firstName: null, name: '   ' })).toBeNull();
  });
});
