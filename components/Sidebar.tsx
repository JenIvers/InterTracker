import React from 'react';
import { LayoutDashboard, Clock, Target, Folder, School } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'logs', label: 'Activity Log', icon: Clock },
    { id: 'competencies', label: 'Competencies', icon: Target },
    { id: 'artifacts', label: 'Artifact Vault', icon: Folder },
    { id: 'sites', label: 'Sites', icon: School },
  ];

  return (
    <aside className="w-64 glass border-r border-white/30 h-screen fixed left-0 top-0 hidden md:flex flex-col z-50">
      <div className="p-10 border-b border-white/20 flex flex-col items-center text-center">
        <h1 className="text-2xl font-black bg-gradient-to-br from-app-dark via-app-deep to-app-bright bg-clip-text text-transparent tracking-tighter">
          InternPro
        </h1>
        <p className="text-[10px] text-app-slate font-black uppercase tracking-[0.25em] mt-2 opacity-70">
          Bethel University
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-app-dark text-white shadow-xl shadow-[#14293022] font-bold scale-[1.02]'
                  : 'text-app-deep/70 hover:bg-white/50 hover:text-app-dark'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-5 border-t border-white/20">
        <div className="glass-blue rounded-2xl p-4">
          <p className="text-[10px] font-black text-app-deep uppercase tracking-widest mb-1 opacity-60">Status</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-app-bright animate-pulse shadow-[0_0_8px_rgba(66,131,164,0.5)]" />
            <p className="text-xs font-bold text-app-dark">Cloud Syncing</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;