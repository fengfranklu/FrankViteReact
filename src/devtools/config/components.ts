import { ComponentInfo } from '../types';
import { DevToolsConfig } from '../config';

export interface ComponentRegistration {
  components: ComponentInfo[];
  getInitialState: (config: DevToolsConfig) => {
    components: Record<string, ComponentInfo>;
    groups: any[];
    ungroupedComponentIds: string[];
  };
}

// Example implementation
export const createComponentRegistration = (components: ComponentInfo[]): ComponentRegistration => ({
  components,
  getInitialState: (config: DevToolsConfig) => {
    const componentsRecord = components.reduce((acc, component) => {
      acc[component.id] = component;
      return acc;
    }, {} as Record<string, ComponentInfo>);

    return {
      components: componentsRecord,
      groups: [],
      ungroupedComponentIds: components.map(c => c.id)
    };
  }
}); 