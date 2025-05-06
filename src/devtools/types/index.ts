export interface ComponentInfo {
  id: string;
  name: string;
  path: string;
  description: string;
}

export interface ComponentGroup {
  id: string;
  name: string;
  componentIds: string[];
}

export interface ComponentState {
  components: Record<string, ComponentInfo>;
  groups: ComponentGroup[];
  ungroupedComponentIds: string[];
} 