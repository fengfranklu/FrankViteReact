# React Component DevTools

A development tool for visualizing and testing React components in isolation.

## Features

- Component library with drag-and-drop organization
- Component grouping and collapsing
- Persistent state using localStorage
- Isolated component testing environment
- Customizable styling and configuration

## Setup

1. Copy the `devtools` directory to your project's `src` folder.

2. Install required dependencies:
```bash
npm install react-dnd react-dnd-html5-backend lucide-react
```

3. Configure the devtools in your app:

basically plugin/integrate the 'devtools' into your app's app.tsx 

```tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { devToolsRoutes } from './devtools/routes';
import { DevToolsConfig, defaultConfig } from './devtools/config';

// Customize the configuration if needed
const config: DevToolsConfig = {
  ...defaultConfig,
  basePath: '/my-dev-tools', // Custom base path
  componentRoutePrefix: '/my-components', // Custom component route prefix
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Your app routes */}
          {devToolsRoutes}
        </Routes>
      </div>
    </Router>
  );
}
```

4. Create component hosts:

you can use the 'ComponetHostTemplate.tsx' as a starting point

```tsx
// src/devtools/hosts/MyComponentHost.tsx
import MyComponent from '../../components/MyComponent';

export default function MyComponentHost() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">MyComponent Demo</h1>
      <div className="bg-white shadow-md rounded p-6">
        <MyComponent />
      </div>
    </div>
  );
}
```

5. Register your components:

```tsx
// src/devtools/registrations/myComponents.ts
import { ComponentInfo } from '../types';
import { createComponentRegistration } from '../config/components';

const myComponents: ComponentInfo[] = [
  {
    id: 'mycomponent',
    name: 'MyComponent',
    path: '/components/mycomponent',
    description: 'Description of my component'
  },
  // Add more components...
];

export const myComponentRegistration = createComponentRegistration(myComponents);
```

6. Clean up example files:
   - Delete the example component host file from `src/devtools/hosts/ExampleComponentHost.tsx`
   - Remove the example component registration from `src/devtools/registrations/exampleComponents.ts`
   - Update the main registration file (`src/devtools/registrations/index.ts`) to only include your component registrations

Example of a clean `index.ts`:
```tsx
// src/devtools/registrations/index.ts
import { myComponentRegistration } from './myComponents';

export const componentRegistrations = [
  myComponentRegistration,
  // Add more registrations as needed
];
```

## Style Isolation

The devtools components are designed to maintain their look and feel across different projects, regardless of the main project's styling. This is achieved through Tailwind's layer system and scoped classes.

### How it works

1. The devtools styles are defined in `src/devtools/styles/devtools.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .devtools-container {
    @apply container mx-auto p-4 max-w-6xl;
  }

  .devtools-card {
    @apply block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
  }

  /* ... other devtools-specific classes ... */
}
```

2. These styles are automatically scoped to the devtools components and won't affect or be affected by the main project's styles.

3. The styles are imported in the ComponentIndex component:
```tsx
import '../styles/devtools.css';
```

### Benefits

- Complete style isolation from the main project
- Consistent look and feel across different projects
- No style conflicts with the main application
- Maintains all Tailwind functionality while being scoped
- Easy to maintain and update styles in one place

### Customization

If you need to customize the devtools styles:

1. Modify the classes in `src/devtools/styles/devtools.css`
2. Add new classes using the `@layer components` directive
3. Use the `devtools-` prefix for any new utility classes to maintain isolation

Example of adding a custom style:
```css
@layer components {
  .devtools-custom-element {
    @apply bg-blue-100 p-4 rounded-lg;
  }
}
```

This approach ensures that the devtools maintain their appearance and functionality regardless of the main project's styling, making them truly portable and reusable.

## Customization

### Styling

The devtools use Tailwind CSS classes by default. You can customize the styling by modifying the `styling` options in the config:

```tsx
const config: DevToolsConfig = {
  ...defaultConfig,
  styling: {
    containerClass: 'my-custom-container',
    cardClass: 'my-custom-card',
    headerClass: 'my-custom-header'
  }
};
```

### Storage

The devtools use localStorage by default. You can customize the storage keys in the config:

```tsx
const config: DevToolsConfig = {
  ...defaultConfig,
  storageKeys: {
    componentGroups: 'my-custom-groups-key',
    collapsedGroups: 'my-custom-collapsed-key',
    ungroupedCollapsed: 'my-custom-ungrouped-key'
  }
};
```

It's important to use unique storage keys for each project to prevent conflicts with other applications using the devtools. A good practice is to prefix your storage keys with your project name:

```tsx
const config: DevToolsConfig = {
  ...defaultConfig,
  storageKeys: {
    componentGroups: 'my-project-name-groups',
    collapsedGroups: 'my-project-name-collapsed',
    ungroupedCollapsed: 'my-project-name-ungrouped'
  }
};
```

## Best Practices

1. Keep component hosts simple and focused on demonstrating the component's functionality
2. Use TypeScript for better type safety and developer experience
3. Follow the existing pattern for component registration and routing
4. Use the provided configuration options for customization
5. Keep the main application components separate from the devtools components
6. Register components in a separate file for better organization and maintainability

## Contributing

Feel free to submit issues and enhancement requests! 

## Cursor AI Prompt Template for Component Hosts

Use the following prompt template with Cursor AI to generate component host files:

```
Please help me create a component host file for [ComponentName] using the ComponentHostTemplate.tsx as a reference. The component is located at [path/to/component].

Requirements:
1. Analyze the component's props, dependencies, and requirements
2. Create a self-contained host file with all necessary mocks and test data
3. Include comprehensive comments for all props and their expected values
4. Set up any required mock services or data providers
5. Ensure the component can be tested in isolation

Please follow this structure:
- Import the component and any necessary dependencies
- Set up mock data/services based on the component's requirements
- Document all props with comments
- Create a clean, isolated testing environment
- Include any necessary state management or context providers

The host file should be placed in src/devtools/hosts/[ComponentName]Host.tsx
```

Example usage:
```
Please help me create a component host file for TodoList using the ComponentHostTemplate.tsx as a reference. The component is located at src/components/TodoList.tsx.

Requirements:
1. Analyze the component's props, dependencies, and requirements
2. Create a self-contained host file with all necessary mocks and test data
3. Include comprehensive comments for all props and their expected values
4. Set up any required mock services or data providers
5. Ensure the component can be tested in isolation

Please follow this structure:
- Import the component and any necessary dependencies
- Set up mock data/services based on the component's requirements
- Document all props with comments
- Create a clean, isolated testing environment
- Include any necessary state management or context providers

The host file should be placed in src/devtools/hosts/TodoListHost.tsx
```

This prompt will help Cursor AI generate a well-structured host file that:
- Is self-contained with all necessary mocks
- Provides clear documentation for props and usage
- Sets up proper test data and services
- Creates an isolated testing environment
- Follows the project's component host patterns 