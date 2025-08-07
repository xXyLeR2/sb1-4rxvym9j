import React, { useState } from 'react';
import { BarChart3, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export function ClimateSurvey() {
  const { user } = useAuth();
  const { climateQuestions, submitClimateResponse } = useData();
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResponseChange = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    Object.entries(responses).forEach(([questionId, value]) => {
      submitClimateResponse({
        userId: user.id,
        questionId,
        value
      });
    });

    // Salvar comentários se houver
    if (comments.trim()) {
      submitClimateResponse({
        userId: user.id,
        questionId: 'comments',
        value: comments.trim()
      });
    }

    setIsSubmitted(true);
  };

  const getScaleLabel = (value: number) => {
    const labels = ['Muito Insatisfeito', 'Insatisfeito', 'Neutro', 'Satisfeito', 'Muito Satisfeito'];
    return labels[value - 1] || '';
  };

  if (isSubmitted) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Pesquisa Enviada!</h2>
            <p className="text-green-700 mb-6">
              Obrigado por participar da nossa pesquisa de clima organizacional. 
              Suas respostas são muito importantes para melhorarmos nosso ambiente de trabalho.
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-600">
                💡 <strong>Próximos passos:</strong> Os resultados serão compilados e compartilhados 
                com a equipe de RH para desenvolvimento de planos de ação.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="text-blue-600 mr-2" size={28} />
          Pesquisa de Clima Organizacional
        </h2>
        <p className="text-gray-600 mt-1">
          Sua opinião é fundamental para melhorarmos nosso ambiente de trabalho. 
          Esta pesquisa é confidencial e levará apenas alguns minutos.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {climateQuestions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {index + 1}. {question.text}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {question.category}
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-3">
                  Selecione uma opção de 1 (Muito Insatisfeito) a 5 (Muito Satisfeito):
                </p>
                
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex flex-col items-center space-y-2 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={value}
                        onChange={() => handleResponseChange(question.id, value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-2xl">{value}</span>
                      <span className="text-xs text-gray-500 text-center max-w-20">
                        {getScaleLabel(value)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <MessageSquare className="text-blue-600 mr-2" size={20} />
              Comentários Adicionais (Opcional)
            </h3>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Compartilhe suas sugestões, comentários ou ideias para melhorarmos nosso ambiente de trabalho..."
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={Object.keys(responses).length !== climateQuestions.length}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              <span>Enviar Pesquisa</span>
            </button>
          </div>
          
          {Object.keys(responses).length < climateQuestions.length && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Responda todas as perguntas para enviar a pesquisa
            </p>
          )}
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
        <h4 className="font-medium text-blue-800 mb-2">🔒 Política de Privacidade</h4>
        <p className="text-sm text-blue-700">
          Suas respostas são tratadas de forma confidencial e utilizadas apenas para fins de 
          melhoria do ambiente organizacional. Os dados são analisados de forma agregada e 
          anônima pela equipe de RH.
        </p>
      </div>
    </div>
  );
}