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

## Best Practices

1. Keep component hosts simple and focused on demonstrating the component's functionality
2. Use TypeScript for better type safety and developer experience
3. Follow the existing pattern for component registration and routing
4. Use the provided configuration options for customization
5. Keep the main application components separate from the devtools components
6. Register components in a separate file for better organization and maintainability

## Contributing

Feel free to submit issues and enhancement requests! 