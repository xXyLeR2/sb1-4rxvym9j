export interface User {
  id: string;
  name: string;
  email: string;
  role: 'colaborador' | 'gestor' | 'admin';
  department: string;
  position: string;
  avatar?: string;
  managerId?: string;
  teamMembers?: string[];
}

export interface PDIGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'tecnica' | 'comportamental' | 'lideranca' | 'idiomas';
  status: 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';
  priority: 'baixa' | 'media' | 'alta';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  comments: Comment[];
  progress: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface ClimateQuestion {
  id: string;
  text: string;
  category: 'satisfacao' | 'engajamento' | 'lideranca' | 'ambiente';
  type: 'escala' | 'multipla_escolha' | 'texto';
  options?: string[];
}

export interface ClimateResponse {
  id: string;
  userId: string;
  questionId: string;
  value: number | string;
  submittedAt: string;
}

export interface OneOnOneMeeting {
  id: string;
  employeeId: string;
  managerId: string;
  scheduledAt: string;
  status: 'agendada' | 'realizada' | 'cancelada';
  notes?: string;
  topics: string[];
  createdAt: string;
}