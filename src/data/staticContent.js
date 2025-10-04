// Datos estáticos para la aplicación - Reemplaza el backend
export const staticContent = {
  pages: [
    {
      id: 'introduccion',
      title: 'Introducción a la Programación Competitiva',
      description: 'Primeros pasos en el mundo de la programación competitiva',
      category: 'introduccion',
      order_index: 0,
      is_active: true,
      sections: [
        {
          id: 'que-es',
          title: '¿Qué es la Programación Competitiva?',
          type: 'text',
          content: `# ¿Qué es la Programación Competitiva?

La programación competitiva es una actividad mental que consiste en escribir código fuente para resolver problemas de algoritmia en el menor tiempo posible.

## Características principales

* **Tiempo limitado**: Los concursos tienen duraciones específicas
* **Problemas algorítmicos**: Requieren pensamiento lógico y matemático
* **Múltiples lenguajes**: C++, Python, Java son los más populares
* **Ranking global**: Competencia con programadores de todo el mundo

## Beneficios

* Mejora las habilidades de resolución de problemas
* Prepara para entrevistas técnicas
* Desarrolla el pensamiento algorítmico
* Conecta con una comunidad global`,
          order_index: 0
        },
        {
          id: 'primeros-pasos',
          title: 'Primeros Pasos',
          type: 'text',
          content: `# Primeros Pasos

## 1. Elegir un Lenguaje

### C++
* **Ventajas**: Muy rápido, gran cantidad de librerías (STL)
* **Desventajas**: Sintaxis más compleja
* **Recomendado para**: Competidores serios

### Python
* **Ventajas**: Sintaxis simple, fácil de escribir
* **Desventajas**: Más lento en ejecución
* **Recomendado para**: Principiantes

## 2. Plataformas de Práctica

* **Codeforces**: La más popular mundialmente
* **AtCoder**: Concursos japoneses de alta calidad
* **LeetCode**: Orientado a entrevistas de trabajo
* **UVa Online Judge**: Problemas clásicos

## 3. Configurar el Entorno

### Para C++
\`\`\`bash
g++ -std=c++17 -O2 -Wall solution.cpp -o solution
\`\`\`

### Para Python
\`\`\`bash
python3 solution.py
\`\`\``,
          order_index: 1
        }
      ]
    },
  ],
  
  categories: [
    {
      id: 'introduccion',
      title: 'INTRODUCCIÓN',
      description: 'Primeros pasos en programación competitiva',
      order_index: 0,
      is_active: true
    },
    {
      id: 'estructuras-de-datos',
      title: 'ESTRUCTURAS DE DATOS',
      description: 'Arrays, listas, árboles y más',
      order_index: 1,
      is_active: true
    },
    {
      id: 'algoritmos',
      title: 'ALGORITMOS',
      description: 'Algoritmos fundamentales',
      order_index: 2,
      is_active: true
    }
  ]
}; 