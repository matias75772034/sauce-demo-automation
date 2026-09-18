'use strict'

const BasePage = require('./BasePage')
const constants = require('../config/constants')

/**
 * LoginPage - Page Object para la página de inicio de sesión.
 * URL: https://www.saucedemo.com
 */
class LoginPage extends BasePage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        super(page)
        this.url = constants.urls.base

        this.selectors = {
            usernameInput: '[data-test="username"]',
            passwordInput: '[data-test="password"]',
            loginButton: '[data-test="login-button"]',
            errorMessage: '[data-test="error"]'
        }
    }

    /**
     * Navega a la página de login
     */
    async navigate() {
        await super.navigate(this.url)
    }

    /**
     * Completa y envía el formulario de login
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        await this.fill(this.selectors.usernameInput, username)
        await this.fill(this.selectors.passwordInput, password)
        await this.click(this.selectors.loginButton)
    }

    /**
     * Obtiene el texto del mensaje de error
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        await this.waitForElement(this.selectors.errorMessage)
        return this.getText(this.selectors.errorMessage)
    }

    /**
     * Verifica si el mensaje de error es visible
     * @returns {Promise<boolean>}
     */
    async isErrorVisible() {
        return this.isVisible(this.selectors.errorMessage)
    }
}

module.exports = LoginPage