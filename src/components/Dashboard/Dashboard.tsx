import React from 'react';
import { Target, Users, BarChart3, Calendar, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export function Dashboard() {
  const { user } = useAuth();
  const { pdiGoals, oneOnOneMeetings } = useData();

  const userGoals = pdiGoals.filter(goal => goal.userId === user?.id);
  const completedGoals = userGoals.filter(goal => goal.status === 'concluida').length;
  const inProgressGoals = userGoals.filter(goal => goal.status === 'em_andamento').length;
  const upcomingMeetings = oneOnOneMeetings.filter(meeting => {
    const isParticipant = meeting.employeeId === user?.id || meeting.managerId === user?.id;
    const isUpcoming = meeting.status === 'agendada' && new Date(meeting.scheduledAt) > new Date();
    return isParticipant && isUpcoming;
  }).length;
  
  const averageProgress = userGoals.length > 0 
    ? Math.round(userGoals.reduce((sum, goal) => sum + goal.progress, 0) / userGoals.length)
    : 0;

  const recentMeetings = oneOnOneMeetings.filter(meeting => 
    (meeting.employeeId === user?.id || meeting.managerId === user?.id) && 
    meeting.status === 'realizada'
  ).length;

  const stats = [
    {
      label: 'Metas PDI Ativas',
      value: inProgressGoals,
      icon: Target,
      color: 'bg-blue-500',
      change: '+2 este mês'
    },
    {
      label: 'Metas Concluídas',
      value: completedGoals,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: `${Math.round((completedGoals / Math.max(userGoals.length, 1)) * 100)}% taxa de conclusão`
    },
    {
      label: '1:1 Agendados',
      value: upcomingMeetings,
      icon: Calendar,
      color: 'bg-purple-500',
      change: upcomingMeetings > 0 ? 'Próximos agendados' : 'Nenhum agendado'
    },
    {
      label: 'Progresso Médio',
      value: `${averageProgress}%`,
      icon: Clock,
      color: 'bg-orange-500',
      change: 'das metas PDI'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Olá, {user?.name}! 👋</h2>
        <p className="text-blue-100">
          Bem-vindo à sua central de desenvolvimento. Aqui você pode acompanhar seu progresso e crescimento profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="text-blue-600 mr-2" size={20} />
            Metas PDI Recentes
          </h3>
          
          {userGoals.length > 0 ? (
            <div className="space-y-4">
              {userGoals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    goal.status === 'concluida' ? 'bg-green-500' :
                    goal.status === 'em_andamento' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{goal.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        goal.status === 'concluida' ? 'bg-green-100 text-green-700' :
                        goal.status === 'em_andamento' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {goal.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">
                        Prazo: {new Date(goal.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhuma meta PDI cadastrada ainda.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="text-green-600 mr-2" size={20} />
            Progresso Geral
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">PDI - Desenvolvimento</span>
                <span className="text-sm text-gray-500">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Satisfação - Clima</span>
                <span className="text-sm text-gray-500">4.2/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Engajamento</span>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Dica:</strong> Mantenha-se engajado com suas metas e participe ativamente das pesquisas de clima para um desenvolvimento contínuo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}