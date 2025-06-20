# Ejercicios para conocer < vector >
A modo de recordatorio!!
vector <tipo\> nombre(tamaño):Declaración de un array unidimensional. 
vector <vector<tipo\>\> nombre(tamaño, vector<tipo\>(tamaño)):Declaración de un array bidimensional.
vector.push_back(elemento):Añade el elemento al final del vector.
vector.find(elemento):Busca un elemento.
vector.pop_back():Elimina el último elemento.
vector.empty():Devuelve true o false en función de si es vacío o no.
vector.assign(vector2): Reemplaza el contenido de vector por el de vector2.
## 1.-Remove element -> [Leetcode](https://leetcode.com/problems/remove-element/description/?envType=problem-list-v2&envId=array)
Este problema pese a ser básico lo recomendamos simplemente para empezar a hacer uso del vector de la STL. Una solución (sin usar sets) es:

       class  Solution {
		    public:
			    int removeDuplicates(vector<int>&  nums) {
					    int izquierda=0;
					    for(int i=1; i<nums.size(); i++){
						    if(nums[i]!=nums[izquierda]){
							    izquierda++;
							    nums[izquierda]=nums[i];
								    }
								 }
							    return izquierda+1;
						    }
					    };

Como se ve, el uso de esta biblioteca es igual al de los arrays vistos en FP/MP, con la singularidad de que existen funciones hechas muy útiles (tales como arr.size() que nos dice el tamaño del vector).
## 2.-Spiral Matrix -> [Leetcode](https://leetcode.com/problems/spiral-matrix/?envType=problem-list-v2&envId=array)
Este problema puede ser útil para seguir entrenando la lógica de programación y la práctica con el vector de la STL. 
A continuación hay una serie de pistas por si se necesitan (lo normal si es vuestro primer ejercicio así):
1.-Trata de replicar la espiral.
2.-Usa bools para marcar la subida, bajada, izquierda o derecha.
_____
**Esto solo es una posible solución, puede hacerse otras formas.**

   

    class Solution {
    public:
        vector<int> spiralOrder(vector<vector<int>>& matrix) { 
            // Se calcula el número total de elementos para la condición de parada del bucle.
            int elementos = matrix.size() * matrix[0].size();
        
        // El vector donde se almacenará el resultado.
        vector<int> solucion;
        
        // Contador para llevar la cuenta de los elementos añadidos.
        int aniadidos = 0;

        // --- VARIABLES DE ESTADO ---
        // Estas banderas controlan la dirección del movimiento en cada fase.

        // Controla la dirección vertical: 1 para BAJAR, 0 para SUBIR.
        bool arriba_abajo = 1; 
        // Controla la dirección horizontal: 1 para DERECHA, 0 para IZQUIERDA.
        bool derecha_izquierda = 1;
        // Controla el tipo de movimiento: 1 para HORIZONTAL, 0 para VERTICAL.
        bool horizontal_vertical = 1;

        // --- CONTADORES DE PASOS ---
        // Indican cuántas celdas recorrer en la dirección actual.

        // Número de pasos en horizontal, inicializado con el ancho de la matriz.
        int x = matrix[0].size();
        // Número de pasos en vertical, inicializado con la altura menos uno.
        int y = matrix.size() - 1;

        // --- COORDENADAS ---
        // `filas` y `columnas` marcan la posición actual en la matriz.
        int filas = 0;
        int columnas = 0;

        // --- BUCLE PRINCIPAL ---
        // Se ejecuta hasta que se hayan recogido todos los elementos.
        while (aniadidos != elementos) {
            
            // Se comprueba si el turno de movimiento es horizontal.
            if (horizontal_vertical) {
                
                // Si es horizontal, se comprueba si es hacia la derecha.
                if (derecha_izquierda) { // --- FASE 1: DERECHA ---
                    // El bucle recorre 'x' pasos, moviendo el índice de la columna.
                    for (int i = 0; i < x; i++, columnas++) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    // AJUSTE POST-MOVIMIENTO:
                    columnas--; // Se corrige la columna, que se pasó en 1.
                    filas++;    // Se baja una fila para la siguiente fase (ABAJO).
                    derecha_izquierda = 0; // Se cambia el estado para el próximo movimiento horizontal.
                
                } else { // --- FASE 3: IZQUIERDA ---
                    // El bucle recorre 'x' pasos, decrementando el índice de la columna.
                    for (int i = 0; i < x; i++, columnas--) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    // AJUSTE POST-MOVIMIENTO:
                    columnas++; // Se corrige la columna.
                    filas--;    // Se sube una fila para la siguiente fase (ARRIBA).
                    derecha_izquierda = 1; // Se cambia el estado.
                }

                x--; // Se decrementa el número de pasos para el siguiente tramo horizontal.
                horizontal_vertical = 0; // Se cambia el turno a movimiento vertical.
            
            } else { // Si el turno es de movimiento vertical.

                // Si es vertical, se comprueba si es hacia abajo.
                if (arriba_abajo) { // --- FASE 2: ABAJO ---
                    // El bucle recorre 'y' pasos, incrementando el índice de la fila.
                    for (int j = 0; j < y; j++, filas++) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    // AJUSTE POST-MOVIMIENTO:
                    filas--;    // Se corrige la fila.
                    columnas--; // Se mueve una columna a la izquierda para la fase (IZQUIERDA).
                    arriba_abajo = 0; // Se cambia el estado.
                
                } else { // --- FASE 4: ARRIBA ---
                    // El bucle recorre 'y' pasos, decrementando el índice de la fila.
                    for (int j = 0; j < y; j++, filas--) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    // AJUSTE POST-MOVIMIENTO:
                    filas++;    // Se corrige la fila.
                    columnas++; // Se mueve una columna a la derecha para la fase (DERECHA).
                    arriba_abajo = 1; // Se cambia el estado.
                }

                y--; // Se decrementa el número de pasos para el siguiente tramo vertical.
                horizontal_vertical = 1; // Se cambia el turno a movimiento horizontal.
            }
        }
        
        // Se devuelve el vector resultante.
            return solucion;
        }
    };

