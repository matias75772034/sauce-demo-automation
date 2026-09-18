# 🧪 Sauce Demo — Automation Suite

Suite de pruebas automatizadas para [Sauce Demo](https://www.saucedemo.com/) construida con **Playwright**, **Cucumber (BDD)** y **JavaScript**, siguiendo el patrón **Page Object Model (POM)**.

---

## 📋 Tabla de Contenidos

- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Ejecución de Pruebas](#-ejecución-de-pruebas)
- [Escenarios Cubiertos](#-escenarios-cubiertos)
- [Estrategia de Automatización](#-estrategia-de-automatización)

---

## ✅ Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18.x o superior |
| npm         | 9.x o superior  |

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/matias75772034/sauce-demo-automation.git
cd sauce-demo-automation

# 2. Instalar dependencias (también instala el browser Chromium)
npm install
```

---

## 📁 Estructura del Proyecto

sauce-demo-automation/
│
├── config/ # Configuración centralizada
│ ├── constants.js # URLs, títulos y mensajes del sistema
│ └── users.js # Credenciales de usuarios de prueba
│
├── features/ # Feature files en Gherkin (BDD)
│ ├── login.feature # Escenarios de inicio de sesión
│ ├── cart.feature # Escenarios del carrito de compras
│ └── checkout.feature # Escenarios del proceso de compra
│
├── pages/ # Page Object Model (POM)
│ ├── BasePage.js # Clase base con métodos genéricos de Playwright
│ ├── LoginPage.js # PO para la página de login
│ ├── InventoryPage.js # PO para la página de productos
│ ├── CartPage.js # PO para el carrito de compras
│ └── CheckoutPage.js # PO para el flujo de checkout (3 pasos)
│
├── step-definitions/ # Implementación de los steps de Gherkin
│ ├── login.steps.js
│ ├── cart.steps.js
│ └── checkout.steps.js
│
├── support/ # Configuración y ciclo de vida de Cucumber
│ ├── world.js # CustomWorld: inyección de dependencias
│ └── hooks.js # Before/After hooks con screenshot en fallos
│
├── reports/ # Reportes generados automáticamente
│ └── screenshots/ # Screenshots de escenarios fallidos
│
├── .env # Variables de entorno
├── cucumber.js # Configuración de Cucumber
├── package.json
└── README.md

---

## ▶️ Ejecución de Pruebas

```bash
# Todos los tests (headless)
npm test

# Solo smoke tests
npx cucumber-js --tags @smoke

# Solo escenarios de login
npm run test:login

# Solo escenarios del carrito
npm run test:cart

# Solo escenarios de checkout
npm run test:checkout

# Solo escenarios negativos
npx cucumber-js --tags @negative
```

Al terminar, abre el reporte:
```bash
# macOS
open reports/cucumber-report.html

# Windows
start reports/cucumber-report.html
```

---

## 📝 Escenarios Cubiertos

### 🔐 Login (`@login`) — 5 escenarios
| Escenario | Usuario | Resultado esperado |
|-----------|---------|-------------------|
| Login exitoso | `standard_user` | Redirigido a `/inventory.html` |
| Usuario bloqueado | `locked_out_user` | Mensaje de error de bloqueo |
| Credenciales inválidas | `invalid_user` | Mensaje de credenciales incorrectas |
| Contraseña vacía | `standard_user` | Mensaje "Password is required" |
| Usuario vacío | — | Mensaje "Username is required" |

### 🛒 Carrito (`@cart`) — 4 escenarios
| Escenario | Descripción |
|-----------|-------------|
| Agregar un producto | Badge muestra "1" |
| Ver producto en carrito | El ítem aparece en `/cart.html` |
| Agregar múltiples productos | Badge muestra "2", carrito tiene 2 ítems |
| Título del carrito | Título es "Your Cart" |

### 💳 Checkout (`@checkout`) — 4 escenarios
| Escenario | Descripción |
|-----------|-------------|
| Compra exitosa | Confirmación "Thank you for your order!" |
| Resumen del pedido | Producto visible en el overview |
| Error: nombre vacío | "Error: First Name is required" |
| Error: código postal vacío | "Error: Postal Code is required" |

---

## 🏗️ Estrategia de Automatización

### Patrones de diseño
- **Page Object Model (POM)** — separa la lógica de UI de los tests
- **BasePage** — clase base con métodos genéricos reutilizables y manejo de errores descriptivo
- **World Constructor** — inyección de dependencias del browser y Page Objects en cada escenario

### Decisiones técnicas
- Selectores `data-test` priorizados por ser estables ante cambios de CSS
- `config/users.js` centraliza credenciales evitando hardcodeo en los steps
- `config/constants.js` centraliza valores del sistema reutilizados en el código
- Screenshots automáticos en fallos para facilitar el diagnóstico
- Tags `@smoke`, `@positive`, `@negative` para ejecución selectiva

### Credenciales de prueba
| Tipo | Usuario | Contraseña |
|------|---------|-----------|
| Usuario estándar | `standard_user` | `secret_sauce` |
| Usuario bloqueado | `locked_out_user` | `secret_sauce` |