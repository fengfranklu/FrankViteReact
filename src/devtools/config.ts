export interface DevToolsConfig {
  // Base path for the devtools routes
  basePath: string;
  
  // Route prefix for component demos
  componentRoutePrefix: string;
  
  // Storage keys for persistence
  storageKeys: {
    componentGroups: string;
    collapsedGroups: string;
    ungroupedCollapsed: string;
  };
  
  // Custom styling options
  styling: {
    containerClass: string;
    cardClass: string;
    headerClass: string;
  };
}

export const defaultConfig: DevToolsConfig = {
  basePath: '/devindex',
  componentRoutePrefix: '/components',
  storageKeys: {
    componentGroups: 'componentGroups',
    collapsedGroups: 'componentGroupsCollapsedGroups',
    ungroupedCollapsed: 'componentGroupsIsUngroupedCollapsed'
  },
  styling: {
    containerClass: 'container mx-auto p-4 max-w-6xl',
    cardClass: 'bg-white shadow-md rounded p-6',
    headerClass: 'text-2xl font-bold mb-4'
  }
}; 