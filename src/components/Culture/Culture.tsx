import React from 'react';
import { Building2, Heart, Target, Users, Star, Award } from 'lucide-react';

export function Culture() {
  const values = [
    {
      icon: Heart,
      title: 'Pessoas em Primeiro Lugar',
      description: 'Valorizamos cada pessoa e seu desenvolvimento individual',
      color: 'bg-red-500'
    },
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Buscamos a excelência e o alcance de objetivos desafiadores',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalhamos juntos para alcançar objetivos comuns',
      color: 'bg-green-500'
    },
    {
      icon: Star,
      title: 'Inovação',
      description: 'Estimulamos a criatividade e novas formas de trabalhar',
      color: 'bg-purple-500'
    }
  ];

  const behaviors = [
    'Demonstra respeito e empatia com colegas',
    'Busca soluções criativas para os desafios',
    'Compartilha conhecimento e ajuda outros',
    'Mantém foco na qualidade e nos resultados',
    'Age com transparência e integridade',
    'Abraça mudanças e se adapta rapidamente'
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Building2 className="text-blue-600 mr-2" size={28} />
          Cultura Organizacional
        </h2>
        <p className="text-gray-600 mt-1">Conheça nossa missão, valores e comportamentos esperados</p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
        <p className="text-lg text-blue-100 leading-relaxed">
          Desenvolver pessoas excepcionais através de um ambiente colaborativo, inovador e focado no crescimento contínuo, 
          criando valor para nossos colaboradores, clientes e sociedade.
        </p>
      </div>

      {/* Values */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Nossos Valores</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="flex space-x-4">
                <div className={`${value.color} p-3 rounded-lg flex-shrink-0`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expected Behaviors */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Comportamentos Esperados</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {behaviors.map((behavior, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{behavior}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Alignment */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Award className="text-yellow-600 mr-2" size={24} />
          Seu Alinhamento Cultural
        </h3>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800">Pontuação Geral</span>
              <span className="text-2xl font-bold text-green-600">8.7/10</span>
            </div>
            <p className="text-sm text-green-700">
              Excelente alinhamento com nossa cultura! Continue demonstrando nossos valores no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {[8.9, 8.2, 8.8, 8.9][index]}
                </div>
                <div className="text-sm text-gray-600">{value.title}</div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className={`${value.color} h-1 rounded-full`} 
                    style={{ width: `${[89, 82, 88, 89][index]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recognition */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Star className="mr-2" size={24} />
          Reconhecimentos Culturais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Award className="mx-auto mb-2" size={32} />
            <p className="font-medium">Colaborador do Mês</p>
            <p className="text-sm opacity-90">Agosto 2024</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Users className="mx-auto mb-2" size={32} />
            <p className="font-medium">Espírito de Equipe</p>
            <p className="text-sm opacity-90">Q2 2024</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Star className="mx-auto mb-2" size={32} />
            <p className="font-medium">Inovação</p>
            <p className="text-sm opacity-90">Janeiro 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}