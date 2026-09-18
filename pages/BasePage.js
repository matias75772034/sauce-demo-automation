'use strict'

/**
 * BasePage - Clase base para todos los Page Objects.
 * Encapsula las interacciones comunes de Playwright y provee
 * una interfaz reutilizable con manejo de errores descriptivo.
 */
class BasePage {
    /**
     * @param {import('playwright').Page} page - Instancia de la página de Playwright
     */
    constructor(page) {
        this.page = page
    }

    /**
     * Navega a una URL específica
     * @param {string} url
     */
    async navigate(url) {
        try {
            await this.page.goto(url, { waitUntil: 'domcontentloaded' })
        } catch (err) {
            throw new Error(`No se pudo navegar a: "${url}"\n${err.message}`)
        }
    }

    /**
     * Escribe texto en un campo de formulario
     * @param {string} selector
     * @param {string} value
     */
    async fill(selector, value) {
        try {
            await this.page.locator(selector).fill(value)
        } catch (err) {
            throw new Error(`No se pudo escribir en: "${selector}"\n${err.message}`)
        }
    }

    /**
     * Hace clic en un elemento
     * @param {string} selector
     */
    async click(selector) {
        try {
            await this.page.locator(selector).click()
        } catch (err) {
            throw new Error(`No se pudo hacer click en: "${selector}"\n${err.message}`)
        }
    }

    /**
     * Obtiene el texto de un elemento
     * @param {string} selector
     * @returns {Promise<string>}
     */
    async getText(selector) {
        try {
            return await this.page.locator(selector).textContent()
        } catch (err) {
            throw new Error(`No se pudo obtener el texto de: "${selector}"\n${err.message}`)
        }
    }

    /**
     * Verifica si un elemento es visible
     * @param {string} selector
     * @returns {Promise<boolean>}
     */
    async isVisible(selector) {
        try {
            return await this.page.locator(selector).isVisible()
        } catch (err) {
            throw new Error(`No se pudo verificar visibilidad de: "${selector}"\n${err.message}`)
        }
    }

    /**
     * Espera a que un elemento sea visible
     * @param {string} selector
     * @param {number} timeout - Tiempo en ms (default 10000)
     */
    async waitForElement(selector, timeout = 10000) {
        try {
            await this.page.locator(selector).waitFor({ state: 'visible', timeout })
        } catch (err) {
            throw new Error(`Timeout esperando el elemento: "${selector}"\n${err.message}`)
        }
    }

    /**
     * Obtiene la URL actual del navegador
     * @returns {Promise<string>}
     */
    async getCurrentUrl() {
        return this.page.url()
    }

    /**
     * Toma un screenshot de la página actual
     * @param {string} path - Ruta donde se guardará el screenshot
     */
    async takeScreenshot(path) {
        return this.page.screenshot({ path, fullPage: true })
    }
}

module.exports = BasePage