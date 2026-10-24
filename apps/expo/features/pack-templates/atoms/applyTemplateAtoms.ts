import { atom } from 'jotai';

/** Error carried from the New Pack step back to the Apply to Pack list, when
 * the pack was created but its items didn't land. */
export const applyTemplateErrorAtom = atom<string | null>(null);
