import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  ClipboardList, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Lock
} from 'lucide-react';

// --- CONFIGURAÇÃO DA PESQUISA ---

const INTRO_TEXT = `A Agily está em constante evolução.

Esta pesquisa existe para entendermos como podemos melhorar nossa forma de trabalhar, entregar projetos excelentes e crescer como time.
Suas respostas são anônimas e ajudarão a identificar melhorias reais na empresa.

Leva cerca de 3 minutos para responder.`;

const SCALE = [
  { value: 1, label: 'Muito ruim (não acontece)' },
  { value: 2, label: 'Ruim (acontece pouco)' },
  { value: 3, label: 'Regular' },
  { value: 4, label: 'Bom' },
  { value: 5, label: 'Excelente (acontece sempre)' }
];

const CATEGORIES = [
  { id: 'ce', title: 'Clareza Estratégica' },
  { id: 'op', title: 'Operação e Projetos' },
  { id: 'lc', title: 'Liderança e Comunicação' },
  { id: 'dc', title: 'Desenvolvimento e Crescimento' },
  { id: 'qt', title: 'Qualidade Técnica (Engineering Excellence)' },
  { id: 'md', title: 'Mentalidade de Dono (Ownership)' },
  { id: 'oc', title: 'Orientação ao Cliente' }
];

const QUESTIONS = [
  { id: 'ce1', cat: 'ce', text: 'Eu entendo claramente os objetivos da Agily para os próximos meses.' },
  { id: 'ce2', cat: 'ce', text: 'Sei como o meu trabalho contribui para os resultados da empresa.' },
  { id: 'ce3', cat: 'ce', text: 'A empresa comunica bem as prioridades e direcionamentos.' },
  
  { id: 'op1', cat: 'op', text: 'Os projetos em que atuo têm escopo bem definido e objetivos claros.' },
  { id: 'op2', cat: 'op', text: 'A comunicação entre time técnico, gestão e cliente funciona bem.' },
  { id: 'op3', cat: 'op', text: 'Os prazos definidos para os projetos são realistas.' },
  { id: 'op4', cat: 'op', text: 'Os processos da empresa são claros e facilitam a execução do trabalho.' },
  { id: 'op5', cat: 'op', text: 'As prioridades entre projetos são claras e bem definidas.' },
  
  { id: 'lc1', cat: 'lc', text: 'Recebo feedbacks úteis sobre meu trabalho.' },
  { id: 'lc2', cat: 'lc', text: 'Sinto que posso trazer problemas ou sugestões sem receio.' },
  { id: 'lc3', cat: 'lc', text: 'A liderança da empresa toma decisões claras e bem direcionadas.' },
  
  { id: 'dc1', cat: 'dc', text: 'Tenho oportunidades de aprender e evoluir tecnicamente.' },
  { id: 'dc2', cat: 'dc', text: 'Vejo perspectivas de crescimento dentro da empresa.' },
  
  { id: 'qt1', cat: 'qt', text: 'Tenho orgulho da qualidade técnica das soluções que entregamos.' },
  { id: 'qt2', cat: 'qt', text: 'O time se preocupa em construir soluções robustas, e não apenas "fazer funcionar".' },
  { id: 'qt3', cat: 'qt', text: 'As decisões técnicas são tomadas com base em boas práticas, não apenas na urgência da entrega.' },
  { id: 'qt4', cat: 'qt', text: 'O time busca constantemente melhorar processos e soluções.' },
  
  { id: 'md1', cat: 'md', text: 'As pessoas aqui assumem responsabilidade pelos resultados dos projetos.' },
  { id: 'md2', cat: 'md', text: 'O time se preocupa com o resultado final do cliente, não apenas com sua tarefa.' },
  { id: 'md3', cat: 'md', text: 'Sinto motivação para contribuir com a evolução da empresa.' },
  
  { id: 'oc1', cat: 'oc', text: 'Nos preocupamos em gerar valor real para o cliente, não apenas entregar o escopo.' },
  { id: 'oc2', cat: 'oc', text: 'O feedback dos clientes é levado a sério pela empresa.' },
  { id: 'oc3', cat: 'oc', text: 'Sinto que nosso trabalho impacta positivamente os clientes.' }
];

// --- DADOS SIMULADOS PARA O DASHBOARD ---

const MOCK_HISTORY = [
  { quarter: 'Q1 2025', ce: 3.2, op: 2.8, lc: 3.5, dc: 3.4, qt: 4.1, md: 3.9, oc: 4.2 },
  { quarter: 'Q2 2025', ce: 3.5, op: 3.1, lc: 3.7, dc: 3.5, qt: 4.0, md: 4.0, oc: 4.3 },
  { quarter: 'Q3 2025', ce: 3.8, op: 3.3, lc: 3.9, dc: 3.7, qt: 4.2, md: 4.1, oc: 4.4 }
];

const MOCK_CURRENT_RESPONSES = [];

// --- COMPONENTES AUXILIARES ---

const RadarChart = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40;
  const maxValue = 5;

  const getCoordinates = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const points = data.map((d, i) => {
    const coords = getCoordinates(d.value, i, data.length);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div className="flex justify-center items-center w-full h-full p-4 relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Web */}
        {[1, 2, 3, 4, 5].map(level => {
          const levelPoints = data.map((_, i) => {
            const coords = getCoordinates(level, i, data.length);
            return `${coords.x},${coords.y}`;
          }).join(' ');
          return (
            <polygon 
              key={level} 
              points={levelPoints} 
              fill="none" 
              stroke="#e2e8f0" 
              strokeWidth="1"
            />
          );
        })}
        
        {/* Axes */}
        {data.map((_, i) => {
          const coords = getCoordinates(5, i, data.length);
          return (
            <line 
              key={`axis-${i}`} 
              x1={center} y1={center} 
              x2={coords.x} y2={coords.y} 
              stroke="#e2e8f0" 
              strokeWidth="1" 
            />
          );
        })}

        {/* Data Polygon */}
        <polygon 
          points={points} 
          fill="rgba(59, 130, 246, 0.3)" 
          stroke="#3b82f6" 
          strokeWidth="3" 
        />
        {data.map((d, i) => {
          const coords = getCoordinates(d.value, i, data.length);
          return <circle key={`dot-${i}`} cx={coords.x} cy={coords.y} r="4" fill="#2563eb" />;
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const coords = getCoordinates(5.8, i, data.length);
          const isLeft = coords.x < center;
          const isTop = coords.y < center;
          return (
            <text 
              key={`label-${i}`} 
              x={coords.x} 
              y={coords.y} 
              textAnchor="middle" 
              alignmentBaseline="middle"
              className="text-xs font-semibold fill-slate-600"
              style={{ transform: `translate(${isLeft ? '-10px' : '10px'}, ${isTop ? '-10px' : '10px'})` }}
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};


// --- APLICAÇÃO PRINCIPAL ---

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'survey', 'dashboard', 'success'
  const [answers, setAnswers] = useState({});
  const [openText1, setOpenText1] = useState('');
  const [openText2, setOpenText2] = useState('');
  
  // Autenticação do Dashboard
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // Verifica se o usuário já respondeu nesta máquina/navegador
  const [hasAnswered, setHasAnswered] = useState(
    localStorage.getItem('agily_survey_q4_2025_answered') === 'true'
  );
  
  // Dashboard State (In a real app, this would be fetched from an API)
  const [currentResponses, setCurrentResponses] = useState(MOCK_CURRENT_RESPONSES);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isSurveyComplete = () => {
    return QUESTIONS.every(q => answers[q.id] !== undefined);
  };

  const submitSurvey = () => {
    if (!isSurveyComplete()) return;
    
    // Convert current answers to a category aggregate for the mock DB
    const newResponse = {};
    CATEGORIES.forEach(cat => {
      const catQuestions = QUESTIONS.filter(q => q.cat === cat.id);
      const sum = catQuestions.reduce((acc, q) => acc + answers[q.id], 0);
      newResponse[cat.id] = sum / catQuestions.length;
    });

    setCurrentResponses([...currentResponses, newResponse]);
    
    // Marca no navegador que a pessoa já respondeu
    localStorage.setItem('agily_survey_q4_2025_answered', 'true');
    setHasAnswered(true);

    setView('success');
    window.scrollTo(0, 0);
  };

  // --- COMPUTAÇÕES DO DASHBOARD ---
  
  const dashboardData = useMemo(() => {
    if (currentResponses.length === 0) return null;

    const totals = {};
    CATEGORIES.forEach(cat => totals[cat.id] = 0);

    currentResponses.forEach(res => {
      CATEGORIES.forEach(cat => {
        totals[cat.id] += res[cat.id];
      });
    });

    const averages = {};
    CATEGORIES.forEach(cat => {
      averages[cat.id] = (totals[cat.id] / currentResponses.length).toFixed(1);
    });

    const overallAverage = (Object.values(averages).reduce((acc, val) => acc + parseFloat(val), 0) / CATEGORIES.length).toFixed(1);
    
    // Indicador Cultural Agily: (Clareza + Operação + Qualidade Técnica + Mentalidade Dono + Orientação Cliente) / 5
    const culturalIndex = ((
      parseFloat(averages['ce']) + 
      parseFloat(averages['op']) + 
      parseFloat(averages['qt']) + 
      parseFloat(averages['md']) + 
      parseFloat(averages['oc'])
    ) / 5).toFixed(1);

    const radarData = CATEGORIES.map(cat => ({
      label: cat.title.split(' ')[0], // Short name for radar
      fullTitle: cat.title,
      id: cat.id,
      value: parseFloat(averages[cat.id])
    })).sort((a, b) => b.value - a.value); // Sort for ranking

    const alerts = radarData.filter(d => d.value < 3.5);

    return { averages, overallAverage, culturalIndex, radarData, alerts, count: currentResponses.length };
  }, [currentResponses]);


  // --- VIEWS ---

  const renderHome = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Agily Tecnologia</h1>
          <p className="text-blue-100">Sistema de Clima Organizacional</p>
        </div>
        <div className="p-8 space-y-4">
          <button 
            onClick={() => setView('survey')}
            disabled={hasAnswered}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              hasAnswered 
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span className="flex items-center gap-3 font-medium">
              {hasAnswered ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Pesquisa já respondida ✓
                </>
              ) : (
                <>
                  <ClipboardList className="w-5 h-5 text-blue-400" />
                  Responder Pesquisa Q4
                </>
              )}
            </span>
            {!hasAnswered && <ChevronRight className="w-5 h-5" />}
          </button>
          
          {!isAuthenticating ? (
            <button 
              onClick={() => setIsAuthenticating(true)}
              className="w-full flex items-center justify-between bg-white border-2 border-slate-100 text-slate-500 p-4 rounded-lg hover:border-slate-300 hover:text-slate-700 transition-colors mt-2"
            >
              <span className="flex items-center gap-3 font-medium text-sm">
                <Lock className="w-4 h-4" />
                Acesso Liderança (Dashboard)
              </span>
            </button>
          ) : (
            <div className="w-full bg-slate-50 border-2 border-blue-200 p-4 rounded-lg flex flex-col gap-3 mt-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium text-slate-700">Senha de Acesso:</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setAuthError(false); }}
                className="w-full border border-slate-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a senha..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (adminPassword === 'agily2025') {
                      setView('dashboard');
                      setIsAuthenticating(false);
                      setAdminPassword('');
                    } else {
                      setAuthError(true);
                    }
                  }
                }}
              />
              {authError && <span className="text-xs text-red-500 font-medium">Senha incorreta.</span>}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => {
                    setIsAuthenticating(false);
                    setAuthError(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (adminPassword === 'agily2025') {
                      setView('dashboard');
                      setIsAuthenticating(false);
                      setAdminPassword('');
                    } else {
                      setAuthError(true);
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSurvey = () => (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header / Intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Pesquisa de Clima e Cultura</h1>
          <div className="prose text-slate-600 whitespace-pre-line">
            {INTRO_TEXT}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {CATEGORIES.map((category, catIndex) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    {catIndex + 1}
                  </span>
                  {category.title}
                </h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {QUESTIONS.filter(q => q.cat === category.id).map((question, qIndex) => (
                  <div key={question.id} className="p-6">
                    <p className="text-slate-800 font-medium mb-4">{question.text}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {SCALE.map((s) => (
                        <label 
                          key={`${question.id}-${s.value}`}
                          className={`
                            relative flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                            ${answers[question.id] === s.value 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-slate-200 hover:border-slate-300 text-slate-500 hover:bg-slate-50'
                            }
                          `}
                        >
                          <input 
                            type="radio" 
                            name={question.id} 
                            value={s.value}
                            checked={answers[question.id] === s.value}
                            onChange={() => handleAnswer(question.id, s.value)}
                            className="sr-only"
                          />
                          <span className="text-xl font-bold mb-1">{s.value}</span>
                          <span className="text-xs text-center leading-tight">{s.label.split(' (')[0]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Open Questions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Perguntas Abertas
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-slate-800 font-medium mb-2">
                  O que mais atrapalha nossa capacidade de entregar projetos excelentes hoje?
                </label>
                <textarea 
                  rows="4"
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Sua resposta franca ajuda a melhorar a empresa..."
                  value={openText1}
                  onChange={(e) => setOpenText1(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-slate-800 font-medium mb-2">
                  Se você fosse dono da Agily, o que você mudaria ou faria diferente?
                </label>
                <textarea 
                  rows="4"
                  className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Deixe sua sugestão..."
                  value={openText2}
                  onChange={(e) => setOpenText2(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={() => setView('home')}
            className="text-slate-500 hover:text-slate-700 font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={submitSurvey}
            disabled={!isSurveyComplete()}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all
              ${isSurveyComplete() 
                ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30' 
                : 'bg-slate-300 cursor-not-allowed'
              }
            `}
          >
            Enviar Respostas
          </button>
        </div>
        {!isSurveyComplete() && (
          <p className="text-right text-sm text-red-500 mt-2">
            Responda todas as perguntas de múltipla escolha para enviar.
          </p>
        )}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Muito obrigado!</h2>
        <p className="text-slate-600">
          Suas respostas foram registradas anonimamente e farão a diferença na evolução da Agily.
        </p>
        <div className="pt-6">
          <button 
            onClick={() => {
              // Não limpamos as respostas para manter o estado, apenas voltamos à home
              setView('home');
            }}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (!dashboardData) {
      return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
          <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg tracking-wide">AGILY <span className="text-blue-400">PULSE</span></span>
              </div>
              <button 
                onClick={() => setView('home')}
                className="text-sm font-medium text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-md"
              >
                Sair do Dashboard
              </button>
            </div>
          </nav>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Sem dados suficientes</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Ainda não existem respostas registadas para o trimestre atual. Partilhe a pesquisa com a equipa para conseguir visualizar o dashboard.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 pb-12">
        {/* Nav */}
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg tracking-wide">AGILY <span className="text-blue-400">PULSE</span></span>
            </div>
            <button 
              onClick={() => setView('home')}
              className="text-sm font-medium text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-md"
            >
              Sair do Dashboard
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard de Clima & Cultura</h1>
              <p className="text-slate-500">Resultados referentes ao 4º Trimestre (Atual)</p>
            </div>
          </div>

          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Média Geral (Clima)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">{dashboardData.overallAverage}</span>
                  <span className="text-sm font-medium text-slate-400">/ 5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                  Índice Cultural Agily
                  <span title="Média de: Estratégia, Operação, Qualidade Técnica, Dono, Cliente" className="cursor-help text-xs bg-slate-200 text-slate-600 rounded-full w-4 h-4 flex items-center justify-center">?</span>
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-indigo-700">{dashboardData.culturalIndex}</span>
                  <span className="text-sm font-medium text-slate-400">/ 5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Adesão do Time</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">{dashboardData.count}</span>
                  <span className="text-sm font-medium text-slate-400">respostas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Radar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 lg:col-span-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Mapeamento Cultural</h3>
              <div className="flex-1 min-h-[300px]">
                <RadarChart data={dashboardData.radarData} />
              </div>
            </div>

            {/* Dimension Ranking */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 lg:col-span-1">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Score por Dimensão</h3>
              <div className="space-y-4">
                {dashboardData.radarData.map(dim => (
                  <div key={dim.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{dim.fullTitle}</span>
                      <span className="font-bold text-slate-900">{dim.value.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${dim.value < 3.0 ? 'bg-red-500' : dim.value < 3.5 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                        style={{ width: `${(dim.value / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights & Alerts */}
            <div className="space-y-6 lg:col-span-1">
              
              {/* Alertas */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-slate-800">Alertas Automáticos</h3>
                </div>
                <div className="p-5">
                  {dashboardData.alerts.length === 0 ? (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Nenhum indicador em estado de atenção.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {dashboardData.alerts.map(alert => (
                        <li key={alert.id} className="flex items-start gap-3 text-sm">
                          <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.value < 3.0 ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                          <div>
                            <span className="font-semibold text-slate-800">{alert.fullTitle}</span>
                            <span className="text-slate-500 ml-1">({alert.value.toFixed(1)})</span>
                            <p className={`text-xs mt-0.5 ${alert.value < 3.0 ? 'text-red-600' : 'text-amber-600'}`}>
                              {alert.value < 3.0 ? 'Crítico - Requer ação imediata' : 'Atenção - Abaixo da meta (3.5)'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* AI Strategic Suggestion */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-md border border-indigo-800 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lightbulb className="w-24 h-24" />
                </div>
                <div className="px-5 py-4 border-b border-indigo-800/50 flex items-center gap-2 relative z-10">
                  <Lightbulb className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold text-white">Mapa de Prioridades (IA)</h3>
                </div>
                <div className="p-5 relative z-10">
                  <p className="text-xs text-indigo-200 mb-4 uppercase tracking-wider font-semibold">Análise das respostas abertas e métricas</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-1">Top 3 Gargalos</h4>
                      <ul className="text-sm text-indigo-100 space-y-1 list-disc pl-4">
                         <li>Comunicação desalinhada sobre mudanças de escopo (Operação)</li>
                         <li>Sensação de "fazer funcionar rápido" ao invés de código limpo (Qualidade)</li>
                         <li>Falta de visibilidade do cronograma macro (Estratégia)</li>
                      </ul>
                    </div>
                    
                    <div className="pt-3 border-t border-indigo-800/50">
                      <h4 className="text-sm font-semibold text-emerald-300 mb-2">Ações Recomendadas Q1/2026</h4>
                      <ul className="text-sm text-indigo-100 space-y-2">
                         <li className="flex items-start gap-2">
                           <span className="bg-emerald-500/20 text-emerald-300 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs mt-0.5">1</span>
                           <span>Implementar reuniões semanais de "Tech Alignment" entre lideranças técnicas.</span>
                         </li>
                         <li className="flex items-start gap-2">
                           <span className="bg-emerald-500/20 text-emerald-300 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs mt-0.5">2</span>
                           <span>Revisar o processo de hand-off entre comercial e operação de projetos.</span>
                         </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Historical Evolution (Mocked visually) */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Evolução Histórica (Trimestral)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Dimensão</th>
                    {MOCK_HISTORY.map(h => <th key={h.quarter} className="px-4 py-3 font-semibold text-center">{h.quarter}</th>)}
                    <th className="px-4 py-3 font-semibold text-center text-blue-600">Atual (Q4)</th>
                    <th className="px-4 py-3 font-semibold text-center">Tendência</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map(cat => {
                    const currentVal = parseFloat(dashboardData.averages[cat.id]);
                    const previousVal = MOCK_HISTORY[MOCK_HISTORY.length - 1][cat.id];
                    const isUp = currentVal >= previousVal;
                    
                    return (
                      <tr key={cat.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{cat.title}</td>
                        {MOCK_HISTORY.map(h => (
                          <td key={`${cat.id}-${h.quarter}`} className="px-4 py-3 text-center text-slate-500">{h[cat.id].toFixed(1)}</td>
                        ))}
                        <td className="px-4 py-3 text-center font-bold text-slate-900 bg-blue-50/50">{currentVal.toFixed(1)}</td>
                        <td className="px-4 py-3 text-center">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(currentVal - previousVal).toFixed(1)}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // Main Render Logic
  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      {view === 'home' && renderHome()}
      {view === 'survey' && renderSurvey()}
      {view === 'success' && renderSuccess()}
      {view === 'dashboard' && renderDashboard()}
    </div>
  );
}