'use strict'

const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

/**
 * Navega a la página de login de Sauce Demo
 */
Given('que estoy en la página de login de Sauce Demo', async function () {
    await this.loginPage.navigate()
})

/**
 * Ingresa las credenciales y hace submit del formulario de login
 * @param {string} username
 * @param {string} password
 */
When('ingreso el usuario {string} y la contraseña {string}', async function (username, password) {
    await this.loginPage.login(username, password)
})

/**
 * Verifica que el login fue exitoso comprobando la URL y el contenedor de inventario
 */
Then('debería ser redirigido a la página de productos', async function () {
    const isVisible = await this.inventoryPage.isInventoryVisible()
    const currentUrl = await this.inventoryPage.getCurrentUrl()

    expect(isVisible).toBe(true)
    expect(currentUrl).toContain('/inventory.html')
})

/**
 * Verifica que se muestra el mensaje de error esperado
 * @param {string} expectedMessage - Mensaje de error esperado
 */
Then('debería ver el mensaje de error {string}', async function (expectedMessage) {
    const isErrorVisible = await this.loginPage.isErrorVisible()
    expect(isErrorVisible).toBe(true)

    const actualMessage = await this.loginPage.getErrorMessage()
    expect(actualMessage.trim()).toContain(expectedMessage)
})