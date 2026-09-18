'use strict'

const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const users = require('../config/users')

/**
 * Autentica al usuario según el tipo definido en config/users.js
 * @param {string} userType - Clave del usuario (standard_user, locked_out_user)
 */
Given('que estoy autenticado como {string}', async function (userType) {
    const { username, password } = users[userType]
    await this.loginPage.navigate()
    await this.loginPage.login(username, password)
    const isVisible = await this.inventoryPage.isInventoryVisible()
    expect(isVisible).toBe(true)
})

/**
 * Agrega un producto al carrito desde la página de inventario
 * @param {string} productName - Nombre del producto tal como aparece en la UI
 */
When('agrego el producto {string} al carrito', async function (productName) {
    await this.inventoryPage.addProductToCart(productName)
})

/**
 * Navega al carrito de compras y espera que cargue
 */
When('navego al carrito de compras', async function () {
    await this.inventoryPage.goToCart()
})

/**
 * Verifica el número que muestra el badge del carrito
 * @param {string} expectedCount - Número esperado como string
 */
Then('el badge del carrito debe mostrar {string}', async function (expectedCount) {
    const badgeCount = await this.inventoryPage.getCartBadgeCount()
    expect(badgeCount.trim()).toBe(expectedCount)
})

/**
 * Verifica que un producto específico está en el carrito
 * @param {string} productName - Nombre del producto a buscar
 */
Then('el producto {string} debe estar en el carrito', async function (productName) {
    const isInCart = await this.cartPage.isProductInCart(productName)
    expect(isInCart).toBe(true)
})

/**
 * Verifica la cantidad total de productos en el carrito
 * @param {number} expectedCount - Cantidad esperada de productos
 */
Then('el carrito debe contener {int} productos', async function (expectedCount) {
    const count = await this.cartPage.getCartItemCount()
    expect(count).toBe(expectedCount)
})

/**
 * Verifica el título de la página del carrito
 * @param {string} expectedTitle - Título esperado
 */
Then('el título de la página del carrito debe ser {string}', async function (expectedTitle) {
    const actualTitle = await this.cartPage.getPageTitle()
    expect(actualTitle.trim()).toBe(expectedTitle)
})