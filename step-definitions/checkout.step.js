'use strict'

const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const constants = require('../config/constants')

/**
 * Agrega un producto al carrito desde la página de inventario
 * @param {string} productName - Nombre del producto
 */
Given('he agregado el producto {string} al carrito', async function (productName) {
    await this.inventoryPage.addProductToCart(productName)
})

/**
 * Navega al carrito y espera que cargue completamente
 */
Given('he navegado al carrito de compras', async function () {
    await this.inventoryPage.goToCart()
    await this.cartPage.waitForCartPage()
})

/**
 * Inicia el proceso de checkout desde el carrito
 */
When('inicio el proceso de checkout', async function () {
    await this.cartPage.proceedToCheckout()
})

/**
 * Completa el formulario de información del comprador
 * @param {string} firstName  - Nombre
 * @param {string} lastName   - Apellido
 * @param {string} postalCode - Código postal
 */
When(
    'completo la información con nombre {string}, apellido {string} y código postal {string}',
    async function (firstName, lastName, postalCode) {
        await this.checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode)
    }
)

/**
 * Continúa al resumen del pedido (step 2 del checkout)
 */
When('continúo al resumen del pedido', async function () {
    await this.checkoutPage.continueToOverview()
})

/**
 * Finaliza el pedido desde el resumen (step 3 del checkout)
 */
When('finalizo el pedido', async function () {
    await this.checkoutPage.finishOrder()
})

/**
 * Verifica que la orden fue confirmada exitosamente
 */
Then('debería ver el mensaje de confirmación', async function () {
    const isConfirmed = await this.checkoutPage.isOrderConfirmed()
    expect(isConfirmed).toBe(true)

    const header = await this.checkoutPage.getConfirmationHeader()
    expect(header.trim()).toContain(constants.messages.orderConfirmation)
})

/**
 * Verifica que un producto aparece en el resumen del pedido
 * @param {string} productName - Nombre del producto esperado
 */
Then('el producto {string} debe aparecer en el resumen', async function (productName) {
    const items = await this.checkoutPage.getOverviewItemNames()
    const found = items.some(name => name.trim() === productName.trim())
    expect(found).toBe(true)
})

/**
 * Verifica que se muestra un error de validación en el formulario
 * @param {string} expectedError - Mensaje de error esperado
 */
Then('debería ver un error en el formulario {string}', async function (expectedError) {
    const errorMessage = await this.checkoutPage.getFormErrorMessage()
    expect(errorMessage.trim()).toContain(expectedError)
})