import { useState, useMemo } from 'react';
import { Play, CheckCircle, XCircle, Clock, AlertCircle, Code } from 'lucide-react';

// Datos optimizados de ejercicios
const EXERCISES = {
  'hello-world': {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Escribe un programa que imprima "Hello World!" en la consola.',
    difficulty: 'easy',
    timeLimit: 1,
    memoryLimit: 128,
    testCases: [
      {
        input: '',
        expectedOutput: 'Hello World!',
        description: 'Debe imprimir exactamente "Hello World!"'
      }
    ],
    starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Tu código aquí\n    return 0;\n}'
  },
  'sum-two-numbers': {
    id: 'sum-two-numbers',
    title: 'Suma de Dos Números',
    description: 'Lee dos números enteros y muestra su suma.',
    difficulty: 'easy',
    timeLimit: 1,
    memoryLimit: 128,
    testCases: [
      {
        input: '5 3',
        expectedOutput: '8',
        description: 'Suma de 5 + 3'
      },
      {
        input: '10 -2',
        expectedOutput: '8',
        description: 'Suma con números negativos'
      }
    ],
    starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Tu código aquí\n    return 0;\n}'
  }
};

const DIFFICULTY_STYLES = {
  easy: 'text-green-600 bg-green-100 dark:bg-green-900/20',
  medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
  hard: 'text-red-600 bg-red-100 dark:bg-red-900/20'
};

const STATUS_CONFIG = {
  accepted: { icon: CheckCircle, text: 'Aceptado', color: 'text-green-500' },
  wrong_answer: { icon: XCircle, text: 'Respuesta incorrecta', color: 'text-red-500' },
  time_limit: { icon: Clock, text: 'Tiempo límite excedido', color: 'text-yellow-500' },
  runtime_error: { icon: AlertCircle, text: 'Error en tiempo de ejecución', color: 'text-red-500' },
  compile_error: { icon: AlertCircle, text: 'Error de compilación', color: 'text-red-500' },
  pending: { icon: Clock, text: 'En cola...', color: 'text-blue-500 animate-spin' },
  running: { icon: Clock, text: 'Ejecutando...', color: 'text-blue-500 animate-spin' }
};

const CodeExercise = ({ exerciseId = 'hello-world', embedded = false }) => {
  const exercise = EXERCISES[exerciseId] || EXERCISES['hello-world'];
  const [code, setCode] = useState(exercise.starterCode || '');
  const [language, setLanguage] = useState('cpp');
  const [submission, setSubmission] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Simulación optimizada de ejecución
  const executeCode = async () => {
    if (!code.trim()) {
      alert('Por favor escribe algo de código antes de enviar');
      return;
    }

    setSubmitting(true);
    
    // Simular procesamiento mínimo
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validación simple basada en contenido
    const isCorrect = exerciseId === 'hello-world' 
      ? code.includes('Hello World') 
      : code.includes('a+b') || code.includes('a + b');
    
    const result = {
      id: `demo-${Date.now()}`,
      status: isCorrect ? 'accepted' : 'wrong_answer',
      executionTime: Math.random() * 100 + 50,
      testResults: {
        passed: isCorrect ? exercise.testCases.length : 0,
        total: exercise.testCases.length,
        details: exercise.testCases.map(() => ({
          status: isCorrect ? 'accepted' : 'wrong_answer',
          executionTime: Math.random() * 50 + 10
        }))
      }
    };

    setSubmission(result);
    setSubmitting(false);
  };

  const StatusIcon = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const Icon = config.icon;
    return <Icon className={`h-5 w-5 ${config.color}`} />;
  };

  const getStatusText = (status) => STATUS_CONFIG[status]?.text || status;
  const getDifficultyStyle = (difficulty) => DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.easy;

  return (
    <div className={`${embedded ? '' : 'max-w-6xl mx-auto p-6'} space-y-6`}>
      {/* Header del ejercicio */}
      <div className="bg-white/80 dark:bg-pure-black/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-light text-black dark:text-white mb-2">
              {exercise.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Límite: {exercise.timeLimit}s, {exercise.memoryLimit}MB
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-xs">
                Modo Demo
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6">
          {exercise.description}
        </p>

        {/* Test cases */}
        <div>
          <h3 className="text-lg font-light text-black dark:text-white mb-3">
            Ejemplos:
          </h3>
          <div className="space-y-3">
            {exercise.testCases.map((testCase, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Entrada:
                    </div>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-2 rounded border">
                      {testCase.input || '(sin entrada)'}
                    </pre>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Salida esperada:
                    </div>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-2 rounded border">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
                {testCase.description && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {testCase.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor y resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor de código */}
        <div className="bg-white/80 dark:bg-pure-black/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light text-black dark:text-white">
              Tu código
            </h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange font-mono text-sm resize-none"
            placeholder="Escribe tu código aquí..."
            spellCheck={false}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Modo demostración - Ejecución simulada
            </div>
            <button
              onClick={executeCode}
              disabled={submitting || !code.trim()}
              className="flex items-center space-x-2 bg-warm-orange hover:bg-warm-red text-white px-6 py-2 rounded-lg font-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Ejecutando...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Ejecutar (Demo)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-white/80 dark:bg-pure-black/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-lg font-light text-black dark:text-white mb-4">
            Resultados
          </h3>

          {!submission ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Code className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Ejecuta tu código para ver los resultados simulados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Estado general */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <StatusIcon status={submission.status} />
                <div>
                  <div className="font-medium text-black dark:text-white">
                    {getStatusText(submission.status)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tiempo: {submission.executionTime.toFixed(2)}ms (simulado)
                  </div>
                </div>
              </div>

              {/* Resultados de test cases */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Test cases ({submission.testResults.passed}/{submission.testResults.total}):
                </div>
                {submission.testResults.details.map((result, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                    <StatusIcon status={result.status} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Test {index + 1}: {getStatusText(result.status)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({result.executionTime.toFixed(1)}ms)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExercise; 
