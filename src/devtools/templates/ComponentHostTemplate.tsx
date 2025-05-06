import { useState } from 'react';
import { DevToolsConfig, defaultConfig } from '../config';

interface ComponentHostTemplateProps {
  componentName: string;
  config?: DevToolsConfig;
}

export default function ComponentHostTemplate({ 
  componentName,
  config = defaultConfig 
}: ComponentHostTemplateProps) {
  // Add your component's state here
  const [state, setState] = useState<any>(null);

  // Add your component's handlers here
  const handleSomeAction = () => {
    // Handle some action
  };

  return (
    <div className={config.styling.containerClass}>
      <h1 className={config.styling.headerClass}>
        {componentName} Component Demo
      </h1>
      <div className={config.styling.cardClass}>
        <h2 className="text-lg font-semibold mb-4">Interactive Demo</h2>
        {/* Add your component here */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Try:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Add interaction examples here</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 