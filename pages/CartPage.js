'use strict'

const BasePage = require('./BasePage')

/**
 * CartPage - Page Object para la página del carrito de compras.
 * URL: https://www.saucedemo.com/cart.html
 */
class CartPage extends BasePage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        super(page)

        this.selectors = {
            cartContainer: '[data-test="cart-contents-container"]',
            // Nota: SauceDemo no provee atributo data-test para los items del carrito,
            // por lo que se utiliza la clase CSS .cart_item como selector alternativo.
            cartItems: '.cart_item',
            cartItemName: '[data-test="inventory-item-name"]',
            checkoutButton: '[data-test="checkout"]',
            continueShoppingButton: '[data-test="continue-shopping"]',
            pageTitle: '[data-test="title"]'
        }
    }

    /**
     * Espera a que la página del carrito cargue completamente
     */
    async waitForCartPage() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.waitForElement(this.selectors.cartContainer)
    }

    /**
     * Obtiene todos los nombres de productos en el carrito
     * @returns {Promise<string[]>}
     */
    async getCartItemNames() {
        await this.waitForCartPage()
        return this.page.locator(this.selectors.cartItemName).allTextContents()
    }

    /**
     * Verifica si un producto específico está en el carrito
     * @param {string} productName
     * @returns {Promise<boolean>}
     */
    async isProductInCart(productName) {
        const items = await this.getCartItemNames()
        return items.some(name => name.trim() === productName.trim())
    }

    /**
     * Obtiene la cantidad de ítems en el carrito
     * @returns {Promise<number>}
     */
    async getCartItemCount() {
        await this.waitForCartPage()
        return this.page.locator(this.selectors.cartItems).count()
    }

    /**
     * Navega al proceso de checkout
     */
    async proceedToCheckout() {
        await this.click(this.selectors.checkoutButton)
    }

    /**
     * Regresa a la página de productos
     */
    async continueShopping() {
        await this.click(this.selectors.continueShoppingButton)
    }

    /**
     * Obtiene el título de la página del carrito
     * @returns {Promise<string>}
     */
    async getPageTitle() {
        return this.getText(this.selectors.pageTitle)
    }
}

module.exports = CartPage