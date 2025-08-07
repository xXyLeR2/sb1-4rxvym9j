import React from 'react';
import { 
  Home, 
  Target, 
  BarChart3, 
  Calendar, 
  User, 
  Users,
  Award,
  Building2,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'pdi', label: 'PDI', icon: Target },
  { id: 'clima', label: 'Pesquisa de Clima', icon: BarChart3 },
  { id: 'one-on-one', label: 'Agenda 1:1', icon: Calendar },
  { id: 'perfil', label: 'Meu Perfil', icon: User },
  { id: 'time', label: 'Minha Equipe', icon: Users, roles: ['gestor', 'admin'] },
  { id: 'avaliacoes', label: 'Avaliações', icon: Award },
  { id: 'cultura', label: 'Cultura', icon: Building2 },
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { user, logout } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role || 'colaborador')
  );

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-blue-400">People Dev</h2>
        <p className="text-sm text-slate-400 mt-1">Desenvolvimento de Pessoas</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.position}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}