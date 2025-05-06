import { Link } from 'react-router-dom';

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  return (
    <>
      <nav className="bg-white shadow-md p-4 mb-4">
        <div className="container mx-auto">
          <Link to="/devindex" className="text-blue-600 hover:text-blue-800">
            Back to Component Library
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
} 