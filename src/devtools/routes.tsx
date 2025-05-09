import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ComponentLayout } from './components/ComponentLayout';
import ComponentIndex from './components/ComponentIndex';
import { todoComponentRegistration } from './registrations/todoComponents';
import { hostComponents } from './registrations/hostComponents';

// Generate routes from component registrations
const componentRoutes = todoComponentRegistration.components.map(component => (
  <Route
    key={component.id}
    path={component.path}
    element={
      <ComponentLayout>
        {React.createElement(hostComponents[component.id])}
      </ComponentLayout>
    }
  />
));

export const devToolsRoutes = [
  <Route 
    key="devindex" 
    path="/devindex" 
    element={
      <>
        <nav className="bg-white shadow-md p-4 mb-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Back to App</Link>
            <span className="text-gray-600">Component Library</span>
          </div>
        </nav>
        <ComponentIndex />
      </>
    } 
  />,
  ...componentRoutes
]; 