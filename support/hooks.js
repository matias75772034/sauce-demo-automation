'use strict'

const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber')
const fs = require('fs')
const path = require('path')

setDefaultTimeout(30 * 1000)

BeforeAll(function () {
    const dir = path.join('reports', 'screenshots')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
})

Before(async function () {
    await this.init()
})

After(async function (scenario) {
    try {
        if (scenario.result.status === Status.FAILED && this.page) {
            const name = scenario.pickle.name
                .replace(/[^a-z0-9]/gi, '_')
                .toLowerCase()
            const ts = new Date().toISOString().replace(/[:.]/g, '-')
            const filePath = path.join('reports', 'screenshots', `FAILED_${name}_${ts}.png`)
            const screenshot = await this.page.screenshot({ path: filePath, fullPage: true })
            await this.attach(screenshot, 'image/png')
            console.log(`\n📸 Screenshot: ${filePath}`)
        }
    } catch (err) {
        console.error('Error capturando screenshot:', err.message)
    } finally {
        await this.destroy()
    }
})

AfterAll(function () {
    console.log('\n✅ Tests finalizados.')
    console.log('📄 Reporte: reports/cucumber-report.html')
})