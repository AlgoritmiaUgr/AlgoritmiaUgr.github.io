# Ejercicios para conocer `vector` en C++

A modo de recordatorio:

- `vector<tipo> nombre(tamaño)`: Declaración de un array unidimensional.  
- `vector<vector<tipo>> nombre(tamaño, vector<tipo>(tamaño))`: Declaración de un array bidimensional.  
- `vector.push_back(elemento)`: Añade el elemento al final del vector.  
- `vector.pop_back()`: Elimina el último elemento.  
- `vector.empty()`: Devuelve `true` o `false` según si está vacío.  
- `vector.assign(vector2)`: Reemplaza el contenido del vector por el de `vector2`.  

> 🔍 **Nota:** La función `vector.find(elemento)` **no existe** en la STL. Se requiere usar `std::find`.

---

## 1. Remove Element  
👉 [Leetcode - Remove Element](https://leetcode.com/problems/remove-element/description/?envType=problem-list-v2&envId=array)  

Este problema, aunque básico, es ideal para empezar a utilizar `vector` de la STL.  

<details>
<summary>💡 Ver solución</summary>

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int izquierda = 0;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[izquierda]) {
                izquierda++;
                nums[izquierda] = nums[i];
            }
        }
        return izquierda + 1;
    }
};
```

📌 Como se observa, su uso es parecido a los arrays tradicionales, pero con utilidades adicionales como `arr.size()` para obtener el tamaño del vector.

</details>

---

## 2. Spiral Matrix  
👉 [Leetcode - Spiral Matrix](https://leetcode.com/problems/spiral-matrix/?envType=problem-list-v2&envId=array)  

Este ejercicio sirve para entrenar lógica de programación y uso de vectores.  

### 💡 Pistas:
1. Trata de replicar el patrón en espiral.  
2. Usa variables `bool` para controlar las direcciones: subida, bajada, izquierda, derecha.

> ⚠️ **Nota:** Esta es solo una solución posible. Existen múltiples enfoques.

<details>
<summary>💡 Ver solución</summary>

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int elementos = matrix.size() * matrix[0].size();
        vector<int> solucion;
        int aniadidos = 0;

        bool arriba_abajo = 1;
        bool derecha_izquierda = 1;
        bool horizontal_vertical = 1;

        int x = matrix[0].size();
        int y = matrix.size() - 1;

        int filas = 0;
        int columnas = 0;

        while (aniadidos != elementos) {
            if (horizontal_vertical) {
                if (derecha_izquierda) {
                    for (int i = 0; i < x; i++, columnas++) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    columnas--;
                    filas++;
                    derecha_izquierda = 0;
                } else {
                    for (int i = 0; i < x; i++, columnas--) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    columnas++;
                    filas--;
                    derecha_izquierda = 1;
                }
                x--;
                horizontal_vertical = 0;
            } else {
                if (arriba_abajo) {
                    for (int j = 0; j < y; j++, filas++) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    filas--;
                    columnas--;
                    arriba_abajo = 0;
                } else {
                    for (int j = 0; j < y; j++, filas--) {
                        solucion.push_back(matrix[filas][columnas]);
                        aniadidos++;
                    }
                    filas++;
                    columnas++;
                    arriba_abajo = 1;
                }
                y--;
                horizontal_vertical = 1;
            }
        }

        return solucion;
    }
};
```

</details>

---

✅ **Consejo final**: practica estos ejercicios para entender a fondo el comportamiento de los vectores en C++ y prepárate para retos más complejos.
