import { CanDeactivateFn } from '@angular/router';

export const unsavedChangesGuard: CanDeactivateFn<unknown> = (
  component, 
  currentRoute, 
  currentState, 
  nextState
) => {
  return confirm('You have unsaved changes. Are you sure you want to leave the page?');
};
