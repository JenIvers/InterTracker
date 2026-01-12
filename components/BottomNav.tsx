import React from 'react';
import { LayoutDashboard, Clock, Target, Folder, School } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'logs', label: 'Activity Log', icon: Clock },
    { id: 'competencies', label: 'Skills', icon: Target },
    { id: 'artifacts', label: 'Vault', icon: Folder },
    { id: 'sites', label: 'Sites', icon: School },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-slate-200 z-50 pb-safe">
      <nav className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all active:scale-90"
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#142930] text-white shadow-lg' : 'text-slate-400'}`}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-tight text-center leading-none ${
                isActive ? 'text-[#142930]' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;