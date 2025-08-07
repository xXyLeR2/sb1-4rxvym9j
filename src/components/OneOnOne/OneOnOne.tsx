import React, { useState } from 'react';
import { Calendar, Plus, Clock, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { OneOnOneModal } from './OneOnOneModal';

export function OneOnOne() {
  const { user } = useAuth();
  const { oneOnOneMeetings, updateOneOnOneMeeting } = useData();
  const [showModal, setShowModal] = useState(false);

  const userMeetings = oneOnOneMeetings.filter(meeting => 
    meeting.employeeId === user?.id || meeting.managerId === user?.id
  );

  const updateMeetingStatus = (meetingId: string, status: 'realizada' | 'cancelada') => {
    updateOneOnOneMeeting(meetingId, { status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'realizada':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelada':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="text-blue-600 mr-2" size={28} />
            Reuniões 1:1
          </h2>
          <p className="text-gray-600 mt-1">
            Agende e acompanhe suas reuniões individuais de desenvolvimento
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Agendar 1:1</span>
        </button>
      </div>

      {userMeetings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma reunião agendada</h3>
          <p className="text-gray-600 mb-6">
            {user?.role === 'gestor' 
              ? 'Agende reuniões 1:1 com seus liderados para acompanhar o desenvolvimento'
              : 'Agende uma reunião 1:1 com seu gestor para discutir seu desenvolvimento'
            }
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agendar primeira reunião
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userMeetings
            .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
            .map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="text-gray-500" size={16} />
                      <span className="text-sm text-gray-600">
                        {meeting.employeeId === user?.id ? 'Com meu gestor' : 'Com liderado'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="text-gray-500" size={16} />
                      <span className="text-sm font-medium">
                        {new Date(meeting.scheduledAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>

                {meeting.topics.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Tópicos:</p>
                    <ul className="space-y-1">
                      {meeting.topics.map((topic, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {meeting.notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      Anotações:
                    </p>
                    <p className="text-sm text-gray-600">{meeting.notes}</p>
                  </div>
                )}

                {meeting.status === 'agendada' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => updateMeetingStatus(meeting.id, 'realizada')}
                        className="flex-1 text-sm bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors"
                      >
                        Marcar como Realizada
                      </button>
                      <button 
                        onClick={() => updateMeetingStatus(meeting.id, 'cancelada')}
                        className="flex-1 text-sm border border-gray-300 text-gray-700 py-2 px-3 rounded hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {showModal && (
        <OneOnOneModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}