import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PDI } from './components/PDI/PDI';
import { ClimateSurvey } from './components/Climate/ClimateSurvey';
import { OneOnOne } from './components/OneOnOne/OneOnOne';
import { Profile } from './components/Profile/Profile';
import { Culture } from './components/Culture/Culture';

const getViewTitle = (view: string) => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    pdi: 'PDI - Plano de Desenvolvimento Individual',
    clima: 'Pesquisa de Clima Organizacional',
    'one-on-one': 'Reuniões 1:1',
    perfil: 'Meu Perfil',
    time: 'Minha Equipe',
    avaliacoes: 'Avaliações de Desempenho',
    cultura: 'Cultura Organizacional'
  };
  return titles[view] || 'Dashboard';
};

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pdi':
        return <PDI />;
      case 'clima':
        return <ClimateSurvey />;
      case 'one-on-one':
        return <OneOnOne />;
      case 'perfil':
        return <Profile />;
      case 'cultura':
        return <Culture />;
      case 'time':
        return <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">Minha Equipe</h2>
          <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
        </div>;
      case 'avaliacoes':
        return <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">Avaliações de Desempenho</h2>
          <p className="text-gray-600 mt-2">Módulo em desenvolvimento...</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header title={getViewTitle(activeView)} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;