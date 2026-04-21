import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShieldCheck, 
  History, 
  Settings, 
  LogOut, 
  Flower2,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'AI Assistant', icon: MessageSquare, path: '/chat' },
    { name: 'Risk Checker', icon: ShieldCheck, path: '/risk' },
    { name: "Women's Health", icon: Flower2, path: '/women-health' },
    { name: 'Health History', icon: History, path: '/history' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden md:flex flex-col z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-prime-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-prime-600 to-accent bg-clip-text text-transparent">
              Aiviora
            </h1>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-prime-50 text-prime-600 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-slate-50">
            <div className="w-10 h-10 rounded-lg bg-prime-200 flex items-center justify-center text-prime-700">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">{user?.name}</span>
              <span className="text-xs text-slate-500 truncate">{user?.subscription?.plan} Plan</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex md:hidden justify-around p-2 z-50">
        {menuItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center p-2 rounded-lg
              ${isActive ? 'text-prime-600' : 'text-slate-400'}
            `}
          >
            <item.icon size={24} />
            <span className="text-[10px] mt-1">{item.name.split(' ')[0]}</span>
          </NavLink>
        ))}
        <button className="flex flex-col items-center p-2 text-slate-400">
          <Users size={24} />
          <span className="text-[10px] mt-1">Profile</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
