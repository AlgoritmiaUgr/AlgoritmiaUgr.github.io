# Ejercicios `<map>`

En este apartado veremos ejercicios típicos en los que son necesarios el uso de maps, sobre todo los pertenecientes a `unordered_map`.

## 🧠 Recordatorio

### Tipos de `map`:
- `map`: Ordena automáticamente las claves usando orden ascendente (`O(log n)` para inserción y búsqueda).
- `unordered_map`: No garantiza orden, ya que usa una **tabla hash**. Las operaciones tienen un coste promedio de **O(1)**.

### Funciones útiles:
- `map.count(x)`: Devuelve 1 si la clave `x` existe, 0 si no.
- `map.find(x)`: Devuelve un iterador a la clave `x`; si no existe, devuelve `map.end()`.
- `map[clave] = valor`: Asigna `valor` a `clave`. Si no existía, la crea automáticamente.

El iterador de un `map` o `unordered_map` es de tipo `pair<const Key, T>`, donde:
- `pair.first` representa la **clave**
- `pair.second` representa el **valor**

> 📌 Estos contenedores son esenciales cuando necesitamos contar elementos, hacer agrupaciones o buscar eficientemente por clave.

---

## 📄 [Ransom Note](https://leetcode.com/problems/ransom-note/)

### 🧠 Descripción:
Dado un `ransomNote` (nota de secuestro) y una `magazine` (revista con letras disponibles), determina si es posible construir la nota usando únicamente letras de la revista. Cada letra solo puede ser usada una vez.

Este problema es ideal para practicar el conteo de elementos con `unordered_map`, una de las aplicaciones más frecuentes en problemas de frecuencia.

<details>
<summary>💡 Ver solución</summary>

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        unordered_map<char, int> frecuenciasR;
        unordered_map<char, int> frecuenciasM;

        for (char c : ransomNote) {
            frecuenciasR[c]++;
        }

        for (char c : magazine) {
            frecuenciasM[c]++;
        }

        for (auto it : frecuenciasR) {
            char c = it.first;
            if (frecuenciasR[c] > frecuenciasM[c]) return false;
        }

        return true;
    }
};
```

### 🔍 Explicación:
- Se construyen dos `unordered_map` para contar la frecuencia de cada carácter.
- Se recorre la nota (`ransomNote`) y se cuenta cada letra.
- Lo mismo se hace con la revista (`magazine`).
- Finalmente, se comprueba que la revista tiene **al menos** tantas letras de cada tipo como requiere la nota.

</details>

---

## 📄 [Group Anagrams](https://leetcode.com/problems/group-anagrams/)

### 🧠 Descripción:
Dado un vector de palabras, agrúpalas en listas de anagramas. Los anagramas son palabras que contienen las mismas letras en diferente orden.

Este ejercicio es fundamental para comprender cómo usar claves **transformadas** en un `map` para agrupar elementos con propiedades equivalentes.

<details>
<summary>💡 Ver solución</summary>

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> soluciones;
        unordered_map<string, vector<string>> Agrupos;

        for (string s : strs) {
            string clave = s;
            sort(s.begin(), s.end());
            Agrupos[s].push_back(clave);
        }

        for (auto const& it : Agrupos) {
            soluciones.push_back(it.second);
        }

        return soluciones;
    }
};
```

### 🔍 Explicación:
- Se usa un `unordered_map<string, vector<string>>` para agrupar las palabras.
- La clave del mapa es la versión **ordenada alfabéticamente** de cada palabra.
- Las palabras con la misma clave ordenada se agrupan juntas.
- Al final, se recorren los grupos y se almacenan en el resultado final.

</details>

---

## 🧩 Conclusión

Los `map` y `unordered_map` son herramientas imprescindibles en programación competitiva y en desarrollo de software:

- Permiten **buscar y agrupar datos eficientemente**.
- Son fundamentales para **resolver problemas de frecuencia**, conteo, relaciones clave-valor, y agrupamiento.
- Elegir entre `map` o `unordered_map` depende del problema: si necesitas orden, usa `map`; si buscas velocidad, `unordered_map` suele ser mejor.

Dominar estos contenedores te permitirá afrontar una gran variedad de problemas con soluciones limpias, rápidas y efectivas.
