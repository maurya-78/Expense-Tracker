import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      <Link to="/" className="hover:text-indigo-600 transition-colors">
        <Home size={16} />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-slate-300" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white capitalize">
                {value.replace(/-/g, ' ')}
              </span>
            ) : (
              <Link to={to} className="hover:text-indigo-600 transition-colors capitalize">
                {value.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;