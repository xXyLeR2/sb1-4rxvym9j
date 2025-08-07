import React from 'react';
import { User, Mail, Building2, Calendar, Award, Target, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export function Profile() {
  const { user } = useAuth();
  const { pdiGoals, oneOnOneMeetings } = useData();

  if (!user) return null;

  const userGoals = pdiGoals.filter(goal => goal.userId === user.id);
  const userMeetings = oneOnOneMeetings.filter(meeting => 
    meeting.employeeId === user.id || meeting.managerId === user.id
  );

  const completedGoals = userGoals.filter(goal => goal.status === 'concluida').length;
  const totalGoals = userGoals.length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <User className="text-blue-600 mr-2" size={28} />
          Meu Perfil
        </h2>
        <p className="text-gray-600 mt-1">Visão completa do seu desenvolvimento profissional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.position}</p>
              <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium mt-2 ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                user.role === 'gestor' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {user.role === 'admin' ? 'Administrador' : user.role === 'gestor' ? 'Gestor' : 'Colaborador'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="text-gray-400" size={16} />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Building2 className="text-gray-400" size={16} />
                <span className="text-gray-600">{user.department}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="text-gray-400" size={16} />
                <span className="text-gray-600">8 meses na empresa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <Target className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
              <p className="text-sm text-gray-600">Metas PDI</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <Award className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
              <p className="text-sm text-gray-600">Concluídas</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <BarChart3 className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
              <p className="text-sm text-gray-600">Taxa de Conclusão</p>
            </div>
          </div>

          {/* Development Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visão Geral do Desenvolvimento</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progresso PDI Geral</span>
                  <span className="text-sm text-gray-500">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Participação em Pesquisas</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Reuniões 1:1 Realizadas</span>
                  <span className="text-sm text-gray-500">{userMeetings.length}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Última reunião: {userMeetings.length > 0 ? 'Há 2 semanas' : 'Nenhuma ainda'}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
            
            <div className="space-y-3">
              {userGoals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    goal.status === 'concluida' ? 'bg-green-500' : 
                    goal.status === 'em_andamento' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                    <p className="text-xs text-gray-500">
                      {goal.status === 'concluida' ? 'Concluída' : `${goal.progress}% completa`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(goal.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
              
              {userGoals.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma atividade recente. Comece criando suas metas de desenvolvimento!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}