// Storage keys
export const STORAGE_KEY = 'componentGroups';
export const COLLAPSED_GROUPS_KEY = 'componentGroupsCollapsedGroups';
export const UNGROUPED_COLLAPSED_KEY = 'componentGroupsIsUngroupedCollapsed';

// Function to check if localStorage is available
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage is not available:', e);
    return false;
  }
}; 