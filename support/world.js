'use strict'

require('dotenv').config()

const { setWorldConstructor, World } = require('@cucumber/cucumber')
const { chromium } = require('playwright')

const LoginPage = require('../pages/LoginPage')
const InventoryPage = require('../pages/InventoryPage')
const CartPage = require('../pages/CartPage')
const CheckoutPage = require('../pages/CheckoutPage')

class CustomWorld extends World {
    constructor(options) {
        super(options)
        this.browser = null
        this.context = null
        this.page = null
        this.loginPage = null
        this.inventoryPage = null
        this.cartPage = null
        this.checkoutPage = null
    }

    /**
     * Inicializa el browser, context, page y todos los Page Objects.
     * Llamado en el hook Before de cada escenario.
     */
    async init() {
        if (this.browser) {
            throw new Error('El browser ya fue inicializado — verifica que destroy() se llama correctamente entre escenarios')
        }

        this.browser = await chromium.launch({
            headless: process.env.HEADLESS !== 'false'
        })

        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 }
        })

        this.page = await this.context.newPage()

        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
    }

    /**
     * Cierra el browser al finalizar el escenario.
     * Llamado en el hook After de cada escenario.
     */
    async destroy() {
        if (this.browser) {
            await this.browser.close()
            this.browser = null
        }
    }
}

setWorldConstructor(CustomWorld)