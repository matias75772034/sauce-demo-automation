'use strict'

const BasePage = require('./BasePage')

/**
 * InventoryPage - Page Object para la página de productos.
 * URL: https://www.saucedemo.com/inventory.html
 */
class InventoryPage extends BasePage {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        super(page)

        this.selectors = {
            inventoryContainer: '[data-test="inventory-container"]',
            cartBadge: '[data-test="shopping-cart-badge"]',
            cartLink: '[data-test="shopping-cart-link"]',
            pageTitle: '[data-test="title"]'
        }
    }

    /**
     * Genera el selector del botón "Add to cart" a partir del nombre del producto.
     * Convierte el nombre a kebab-case para coincidir con el atributo data-test.
     * Ejemplo: "Sauce Labs Backpack" → [data-test="add-to-cart-sauce-labs-backpack"]
     * @param {string} productName
     * @returns {string}
     */
    getAddToCartSelector(productName) {
        const kebab = productName.toLowerCase().replace(/\s+/g, '-')
        return `[data-test="add-to-cart-${kebab}"]`
    }

    /**
     * Verifica que la página de inventario cargó correctamente
     * @returns {Promise<boolean>}
     */
    async isInventoryVisible() {
        await this.waitForElement(this.selectors.inventoryContainer)
        return this.isVisible(this.selectors.inventoryContainer)
    }

    /**
     * Agrega un producto al carrito por su nombre
     * @param {string} productName - Nombre del producto tal como aparece en la UI
     */
    async addProductToCart(productName) {
        const selector = this.getAddToCartSelector(productName)
        await this.waitForElement(selector)
        await this.click(selector)
    }

    /**
     * Obtiene el número del badge del carrito
     * @returns {Promise<string>}
     */
    async getCartBadgeCount() {
        await this.waitForElement(this.selectors.cartBadge)
        return this.getText(this.selectors.cartBadge)
    }

    /**
     * Verifica si el badge del carrito es visible
     * @returns {Promise<boolean>}
     */
    async isCartBadgeVisible() {
        return this.isVisible(this.selectors.cartBadge)
    }

    /**
     * Navega al carrito y espera que la URL cambie
     */
    async goToCart() {
        await this.click(this.selectors.cartLink)
        await this.page.waitForURL('**/cart.html')
    }
}

module.exports = InventoryPage