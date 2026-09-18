# 📐 Estrategia de Automatización — Sauce Demo

## 1. Enfoque General: BDD (Behavior-Driven Development)

Se adoptó **BDD** como enfoque central usando **Cucumber + Gherkin**. Esto permite que los criterios de aceptación definidos en la historia de usuario se conviertan directamente en escenarios de prueba legibles por cualquier miembro del equipo (negocio, QA, desarrollo), cerrando la brecha entre especificación y automatización.

---

## 2. Patrones de Diseño Implementados

### 2.1 Page Object Model (POM)

**Propósito:** Separar la lógica de interacción con la UI de la lógica de las pruebas.

**Implementación:**

BasePage ← métodos genéricos de Playwright (fill, click, getText...)
├── LoginPage ← selectores y acciones de la página de login
├── InventoryPage ← selectores y acciones del catálogo de productos
├── CartPage ← selectores y acciones del carrito
└── CheckoutPage ← selectores y acciones del flujo de checkout (3 pasos)


**Beneficios:**
- Un único lugar para actualizar selectores cuando cambia la UI.
- Reutilización de métodos entre diferentes escenarios.
- Steps definitions limpios, enfocados en la lógica del test, no en la UI.

### 2.2 World Constructor (Dependency Injection)

**Propósito:** Compartir el estado del browser y los Page Objects entre todos los steps de un mismo escenario, sin usar variables globales.

**Implementación:** `support/world.js` define un `CustomWorld` que encapsula el browser, context, page y todas las instancias de Page Objects. Cucumber inyecta este mundo en cada step definition a través del contexto `this`.

```js
// Acceso en steps — sin imports, sin globals
When('agrego el producto {string} al carrito', async function (productName) {
  await this.inventoryPage.addProductToCart(productName)
})
```

**Beneficios:**
- Aislamiento total entre escenarios (cada uno arranca un browser limpio).
- No hay acoplamiento entre steps definitions — comparten el mismo contexto.
- Facilita la paralelización futura.

### 2.3 Hooks de Ciclo de Vida

**`Before`:** Inicializa el browser y los Page Objects antes de cada escenario.
**`After`:** Cierra el browser y captura un screenshot si el escenario falló.

Esto garantiza que cada escenario sea completamente independiente y autónomo.

---

## 3. Estructura de Selectores

Se priorizó el uso de atributos `data-test` de SauceDemo, que son:
- **Estables:** No cambian con refactors de CSS o clases.
- **Semánticos:** Comunican la intención del elemento.
- **Recomendados por Playwright** como estrategia de localización.

En el caso del carrito, SauceDemo no provee `data-test` para los items, por lo que se utilizó la clase CSS `.cart_item` como selector alternativo, documentado con un comentario en el código.

---

## 4. Cobertura de Escenarios

Se cubrieron los **5 criterios de aceptación** de la historia de usuario:

| # | Criterio | Escenario(s) |
|---|----------|-------------|
| 1 | Login con credenciales válidas | `login.feature` — Escenario positivo |
| 2 | Login con credenciales inválidas | `login.feature` — Scenario Outline negativo |
| 3 | Agregar producto al carrito | `cart.feature` |
| 4 | Ver productos en el carrito | `cart.feature` |
| 5 | Completar proceso de compra | `checkout.feature` |

---

## 5. Tagging Strategy

| Tag | Descripción |
|-----|-------------|
| `@login` | Todos los tests de login |
| `@cart` | Todos los tests del carrito |
| `@checkout` | Todos los tests de checkout |
| `@smoke` | Casos críticos del flujo principal (happy path) |
| `@positive` | Escenarios de flujo exitoso |
| `@negative` | Escenarios de validación y error |

---

## 6. Mantenibilidad y Escalabilidad

- **`config/users.js`:** Credenciales centralizadas — agregar un nuevo usuario no requiere tocar los tests.
- **`config/constants.js`:** URLs, títulos y mensajes centralizados — un cambio en la app se refleja en un solo lugar.
- **Selectores dinámicos:** `InventoryPage` genera automáticamente los selectores de productos a partir del nombre, sin duplicar código para cada producto.
- **`Background` en features:** Los pasos comunes se definen una vez y aplican a todos los escenarios del feature.

---

## 7. Reporte y Evidencia

- **HTML Report:** Generado automáticamente al ejecutar, muestra resultados por escenario con duración y estado.
- **Screenshots automáticos:** Cada escenario fallido genera un screenshot con timestamp adjunto al reporte HTML, facilitando el diagnóstico sin re-ejecutar.