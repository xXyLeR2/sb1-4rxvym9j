import React, { useState } from 'react';
import { X, Calendar, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface OneOnOneModalProps {
  onClose: () => void;
}

export function OneOnOneModal({ onClose }: OneOnOneModalProps) {
  const { user } = useAuth();
  const { scheduleOneOnOne } = useData();
  
  const [formData, setFormData] = useState({
    scheduledAt: '',
    topics: [''],
    notes: '',
    participantType: user?.role === 'gestor' ? 'liderado' : 'gestor'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Determinar IDs baseado no tipo de usuário
    const employeeId = user.role === 'gestor' ? 'temp-employee' : user.id;
    const managerId = user.role === 'gestor' ? user.id : (user.managerId || 'temp-manager');
    
    scheduleOneOnOne({
      employeeId,
      managerId,
      scheduledAt: formData.scheduledAt,
      status: 'agendada',
      topics: formData.topics.filter(topic => topic.trim() !== ''),
      notes: formData.notes
    });
    
    onClose();
  };

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const updateTopic = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="text-blue-600 mr-2" size={24} />
            Agendar Reunião 1:1
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data e Horário *
            </label>
            <input
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {user?.role === 'gestor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reunião com:
              </label>
              <select
                value={formData.participantType}
                onChange={(e) => setFormData(prev => ({ ...prev, participantType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="liderado">Membro da equipe</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tópicos a Discutir
            </label>
            <div className="space-y-3">
              {formData.topics.map((topic, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Tópico ${index + 1}`}
                  />
                  {formData.topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTopic}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                + Adicionar tópico
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MessageSquare size={16} className="mr-1" />
              Anotações Preparatórias (Opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Pontos importantes, objetivos da reunião, feedbacks prévios..."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para uma boa reunião 1:1:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Prepare-se com antecedência</li>
              <li>• Foque no desenvolvimento e carreira</li>
              <li>• Seja aberto e honesto</li>
              <li>• Defina próximos passos claros</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}