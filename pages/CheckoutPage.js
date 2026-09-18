'use strict'

const BasePage = require('./BasePage')

/**
 * CheckoutPage - Page Object para el flujo completo de checkout.
 * Cubre 3 pasos:
 *   Step 1 - Your Information (/checkout-step-one.html)
 *   Step 2 - Overview         (/checkout-step-two.html)
 *   Step 3 - Complete         (/checkout-complete.html)
 */
class CheckoutPage extends BasePage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        super(page)

        this.selectors = {
            // Step 1 - Formulario de información
            firstNameInput: '[data-test="firstName"]',
            lastNameInput: '[data-test="lastName"]',
            postalCodeInput: '[data-test="postalCode"]',
            continueButton: '[data-test="continue"]',
            errorMessage: '[data-test="error"]',

            // Step 2 - Resumen del pedido
            overviewContainer: '[data-test="checkout-summary-container"]',
            summaryItemName: '[data-test="inventory-item-name"]',
            summaryTotal: '[data-test="total-label"]',
            finishButton: '[data-test="finish"]',

            // Step 3 - Confirmación
            confirmationHeader: '[data-test="complete-header"]',
            confirmationText: '[data-test="complete-text"]',
            backHomeButton: '[data-test="back-to-products"]'
        }
    }

    // ─── STEP 1: Your Information ─────────────────────────────────────────────

    /**
     * Completa el formulario de información del comprador
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} postalCode
     */
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.waitForElement(this.selectors.firstNameInput)
        await this.fill(this.selectors.firstNameInput, firstName)
        await this.fill(this.selectors.lastNameInput, lastName)
        await this.fill(this.selectors.postalCodeInput, postalCode)
    }

    /**
     * Continúa al paso 2 (overview)
     */
    async continueToOverview() {
        await this.click(this.selectors.continueButton)
    }

    /**
     * Obtiene el mensaje de error del formulario de información
     * @returns {Promise<string>}
     */
    async getFormErrorMessage() {
        await this.waitForElement(this.selectors.errorMessage)
        return this.getText(this.selectors.errorMessage)
    }

    // ─── STEP 2: Overview ─────────────────────────────────────────────────────

    /**
     * Espera a que el resumen del pedido cargue
     */
    async waitForOverview() {
        await this.waitForElement(this.selectors.overviewContainer)
    }

    /**
     * Obtiene los nombres de productos en el resumen del pedido
     * @returns {Promise<string[]>}
     */
    async getOverviewItemNames() {
        await this.waitForOverview()
        return this.page.locator(this.selectors.summaryItemName).allTextContents()
    }

    /**
     * Finaliza la orden desde el resumen
     */
    async finishOrder() {
        await this.waitForOverview()
        await this.click(this.selectors.finishButton)
    }

    // ─── STEP 3: Confirmation ─────────────────────────────────────────────────

    /**
     * Espera a que la pantalla de confirmación cargue
     */
    async waitForConfirmation() {
        await this.waitForElement(this.selectors.confirmationHeader)
    }

    /**
     * Obtiene el encabezado de confirmación del pedido
     * @returns {Promise<string>}
     */
    async getConfirmationHeader() {
        await this.waitForConfirmation()
        return this.getText(this.selectors.confirmationHeader)
    }

    /**
     * Verifica si la pantalla de confirmación es visible
     * @returns {Promise<boolean>}
     */
    async isOrderConfirmed() {
        return this.isVisible(this.selectors.confirmationHeader)
    }

    /**
     * Regresa a la página de productos desde la confirmación
     */
    async backToProducts() {
        await this.click(this.selectors.backHomeButton)
    }
}

module.exports = CheckoutPage