# Ejercicios `<set>`

En este apartado veremos ejercicios típicos en los que son necesarios el uso de sets, sobre todo los pertenecientes a `unordered_set`.

## 🧠 Recordatorio

Para declarar:

1.  `unordered_set<tipo> nombre;`
2.  `set<tipo> nombre;`

**Funciones útiles:**

- `set.insert(x)`: inserta x.  
- `set.erase(x)`: borra x.  
- `set.count(x)`: devuelve 1 (si existe) o 0 (si no existe).  
- `set.find(x)`: devuelve un iterador a `x`; si no existe, devuelve `set.end()`.  
- `set.size()`: devuelve el número de elementos del set.

---

## (EASY) Keating vs. Pritchard  
👉 [Acepta el reto - 731](https://aceptaelreto.com/problem/statement.php?id=731&cat=166)

<details>
<summary>💡 Ver solución</summary>

```cpp
#include <iostream>
#include <unordered_set>

using namespace std;

int main() {
    int n;
    while (cin >> n && n != 0) {
        unordered_set<int> hojas_eliminadas;
        for (int i = 0; i < n; i++) {
            int pagina;
            cin >> pagina;
            // Pagina 1 -> Hoja 1
            // Pagina 2 -> Hoja 1
            // Pagina 3 -> Hoja 2
            // Pagina 4 -> Hoja 2
            // ...
            // Esto se puede generalizar como (pagina + 1) / 2
            hojas_eliminadas.insert((pagina + 1) / 2);
        }
        cout << hojas_eliminadas.size() << "\n"; // El tamaño es el número de hojas únicas
    }
    return 0;
}
```

</details>

---

## (EASY) 217. Contains Duplicate  
👉 [Leetcode - Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

Una forma de resolverlo es usando un `unordered_set`.

<details>
<summary>💡 Solución 1 (con Set)</summary>

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> num_set;
        for (int num : nums) {
            if (num_set.count(num)) {
                return true;
            }
            num_set.insert(num);
        }
        return false;
    }
};
```

</details>

<details>
<summary>⚙️ Solución 2 (Optimizada con sort)</summary>

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for(size_t i = 1; i < nums.size(); i++){
            if(nums[i] == nums[i-1]) return true;
        }
        return false;
    }
};
```

</details>

📊 Comparación de complejidades:

- **Solución 1 (Set)**: Complejidad temporal de **O(N)** y espacial de **O(N)**.
- **Solución 2 (Sort)**: Complejidad temporal de **O(N log N)** y espacial de **O(1)** o **O(log N)** dependiendo de la implementación del sort.

> ℹ️ Aunque la complejidad de la solución con `sort` es teóricamente peor, en la práctica puede ser más rápida para ciertos tamaños de entrada debido a la **localidad de la caché** y a un **menor coste por operación**, que es lo que seguramente observaste.  
>  
> Es un recordatorio importante de que la **complejidad asintótica no lo es todo** en las competiciones: los detalles de implementación y el rendimiento práctico también cuentan.

---

## (EASY) 349. Intersection of Two Arrays  
👉 [Leetcode - Intersection](https://leetcode.com/problems/intersection-of-two-arrays/)

<details>
<summary>💡 Ver solución</summary>

```cpp
#include <vector>
#include <unordered_set>

using namespace std;

class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        vector<int> solucion;
        // Creamos el set a partir del vector más pequeño para optimizar
        unordered_set<int> set_nums(nums1.begin(), nums1.end());

        for (int num : nums2) {
            if (set_nums.count(num)) {
                solucion.push_back(num);
                set_nums.erase(num);
            }
        }
        return solucion;
    }
};
```

</details>
