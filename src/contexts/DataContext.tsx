import React, { createContext, useContext, useState } from 'react';
import { PDIGoal, ClimateQuestion, ClimateResponse, OneOnOneMeeting } from '../types';

interface DataContextType {
  pdiGoals: PDIGoal[];
  addPDIGoal: (goal: Omit<PDIGoal, 'id' | 'createdAt' | 'comments'>) => void;
  updatePDIGoal: (id: string, updates: Partial<PDIGoal>) => void;
  climateQuestions: ClimateQuestion[];
  climateResponses: ClimateResponse[];
  submitClimateResponse: (response: Omit<ClimateResponse, 'id' | 'submittedAt'>) => void;
  oneOnOneMeetings: OneOnOneMeeting[];
  scheduleOneOnOne: (meeting: Omit<OneOnOneMeeting, 'id' | 'createdAt'>) => void;
  updateOneOnOneMeeting: (id: string, updates: Partial<OneOnOneMeeting>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockPDIGoals: PDIGoal[] = [
  {
    id: '1',
    userId: '1',
    title: 'Certificação em Gestão de Pessoas',
    description: 'Obter certificação CHRP para aprimorar conhecimentos em gestão de recursos humanos',
    category: 'tecnica',
    status: 'em_andamento',
    priority: 'alta',
    dueDate: '2025-06-15',
    createdAt: '2025-01-01',
    progress: 40,
    comments: [
      {
        id: '1',
        userId: '2',
        userName: 'João Santos',
        text: 'Ótimo progresso! Continue assim.',
        createdAt: '2025-01-10'
      }
    ]
  },
  {
    id: '2',
    userId: '1',
    title: 'Desenvolver Habilidades de Apresentação',
    description: 'Participar de workshops e praticar apresentações para melhorar comunicação em público',
    category: 'comportamental',
    status: 'planejada',
    priority: 'media',
    dueDate: '2025-04-30',
    createdAt: '2025-01-15',
    progress: 0,
    comments: []
  }
];

const mockClimateQuestions: ClimateQuestion[] = [
  {
    id: '1',
    text: 'Como você avalia seu nível de satisfação geral no trabalho?',
    category: 'satisfacao',
    type: 'escala'
  },
  {
    id: '2',
    text: 'Você se sente engajado com os objetivos da empresa?',
    category: 'engajamento',
    type: 'escala'
  },
  {
    id: '3',
    text: 'Seu gestor direto oferece feedback construtivo e regular?',
    category: 'lideranca',
    type: 'escala'
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [pdiGoals, setPdiGoals] = useState<PDIGoal[]>(mockPDIGoals);
  const [climateQuestions] = useState<ClimateQuestion[]>(mockClimateQuestions);
  const [climateResponses, setClimateResponses] = useState<ClimateResponse[]>([]);
  const [oneOnOneMeetings, setOneOnOneMeetings] = useState<OneOnOneMeeting[]>([]);

  const addPDIGoal = (goalData: Omit<PDIGoal, 'id' | 'createdAt' | 'comments'>) => {
    const newGoal: PDIGoal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: []
    };
    setPdiGoals(prev => [...prev, newGoal]);
  };

  const updatePDIGoal = (id: string, updates: Partial<PDIGoal>) => {
    setPdiGoals(prev => prev.map(goal => 
      goal.id === id ? { 
        ...goal, 
        ...updates,
        // Atualizar data de conclusão se status mudou para concluída
        ...(updates.status === 'concluida' && !goal.completedAt && { 
          completedAt: new Date().toISOString() 
        })
      } : goal
    ));
  };

  const submitClimateResponse = (responseData: Omit<ClimateResponse, 'id' | 'submittedAt'>) => {
    const newResponse: ClimateResponse = {
      ...responseData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    setClimateResponses(prev => [...prev, newResponse]);
  };

  const scheduleOneOnOne = (meetingData: Omit<OneOnOneMeeting, 'id' | 'createdAt'>) => {
    const newMeeting: OneOnOneMeeting = {
      ...meetingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setOneOnOneMeetings(prev => [...prev, newMeeting]);
  };

  const updateOneOnOneMeeting = (id: string, updates: Partial<OneOnOneMeeting>) => {
    setOneOnOneMeetings(prev => prev.map(meeting => 
      meeting.id === id ? { ...meeting, ...updates } : meeting
    ));
  };
  return (
    <DataContext.Provider value={{
      pdiGoals,
      addPDIGoal,
      updatePDIGoal,
      climateQuestions,
      climateResponses,
      submitClimateResponse,
      oneOnOneMeetings,
      scheduleOneOnOne,
      updateOneOnOneMeeting
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}