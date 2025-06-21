# Ejercicios &lt;set&gt;

En este apartado veremos ejercicios típicos en los que son necesarios el uso de sets, sobre todo los pertenecientes a `unordered_set`.

Primero, a modo de recuerdo:

Para declarar:

1.  `unordered_set<tipo> nombre;`
2.  `set<tipo> nombre;`

**Funciones útiles:**

1.  `set.insert(x)`: inserta x.
2.  `set.erase(x)`: borra x.
3.  `set.count(x)`: devuelve 1 (si existe) o 0 (si no existe).
4.  `set.find(x)`: devuelve un iterador a `x`; si no existe, devuelve `set.end()`.
5.  `set.size()`: devuelve el número de elementos del set.

---

## (EASY) Keating vs. Pritchard -> [Acepta el reto](https://aceptaelreto.com/problem/statement.php?id=731&cat=166)

**Posible solución:** 
> ```cpp
> #include <iostream>
> #include <unordered_set>
> 
> using namespace std;
> 
> int main() {
>     int n;
>     while (cin >> n && n != 0) {
>         unordered_set<int> hojas_eliminadas;
>         for (int i = 0; i < n; i++) {
>             int pagina;
>             cin >> pagina;
>             // Pagina 1 -> Hoja 1
>             // Pagina 2 -> Hoja 1
>             // Pagina 3 -> Hoja 2
>             // Pagina 4 -> Hoja 2
>             // ...
>             // Esto se puede generalizar como (pagina + 1) / 2
>             hojas_eliminadas.insert((pagina + 1) / 2);
>         }
>         cout << hojas_eliminadas.size() << "\n"; // El tamaño es el número de hojas únicas
>     }
>     return 0;
> }
> ```

---

## (EASY) 217. Contains Duplicate -> [Leetcode](https://leetcode.com/problems/contains-duplicate/)

Para este ejercicio existen muchas posibles formas de resolverse. Una es usando un `unordered_set`.

**Solución 1 (con Set):** 
> ```cpp
> class Solution {
> public:
>     bool containsDuplicate(vector<int>& nums) {
>         unordered_set<int> num_set;
>         for (int num : nums) { // for in-range
>             if (num_set.count(num)) {
>                 return true;
>             }
>             num_set.insert(num);
>         }
>         return false;
>     }
> };
> ```

El problema de esta solución es que, aunque su complejidad temporal es buena, O(N), puede que no sea la más rápida en todos los casos por el overhead del hash set. Para acostumbrarnos a buscar la mayor eficiencia, vamos a ver otra posible solución. ¿Y si ordenamos el array y comparamos un elemento con su siguiente?

**Solución 2 (Optimizada):** 

> ```cpp
> class Solution {
> public:
>     bool containsDuplicate(vector<int>& nums) {
>         sort(nums.begin(), nums.end());
>         for(size_t i = 1; i < nums.size(); i++){
>             if(nums[i] == nums[i-1]) return true;
>         }
>         return false;
>     }
> };
> ```


Con este segundo código podemos conseguir una mejora en el tiempo de ejecución en algunos casos. Si comparamos las complejidades asintóticas tenemos:

* Solución 1 (Set): Complejidad temporal de **O(N)** y espacial de **O(N)**.
* Solución 2 (Sort): Complejidad temporal de **O(N log N)** y espacial de **O(1)** o **O(log N)** dependiendo de la implementación del sort.

Aunque la complejidad de la solución con `sort` es teóricamente peor, en la práctica puede ser más rápida para ciertos tamaños de entrada debido a la localidad de la caché y a un menor coste por operación, que es lo que seguramente observaste. Es un recordatorio de que la complejidad asintótica no lo es todo en las competiciones.

---

## (EASY) 349. Intersection of Two Arrays -> [Leetcode](https://leetcode.com/problems/intersection-of-two-arrays/)

**Posible solución:** 
> ```cpp
> #include <vector>
> #include <unordered_set>
> 
> using namespace std;
> 
> class Solution {
> public:
>     vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
>         vector<int> solucion;
>         // Creamos el set a partir del vector más pequeño para optimizar
>         unordered_set<int> set_nums(nums1.begin(), nums1.end());
>         
>         for (int num : nums2) {
>             // Si el número está en el set, es una intersección
>             if (set_nums.count(num)) {
>                 solucion.push_back(num);
>                 // Lo borramos para no añadir duplicados si num2 los tiene
>                 set_nums.erase(num);
>             }
>         }
>         return solucion;
>     }
> };
> ```
