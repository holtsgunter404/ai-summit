import asyncio
from playwright.async_api import async_playwright
import os

async def verify_app():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        await page.goto("http://localhost:5173")
        await asyncio.sleep(2)

        # 1. Initial State
        await page.screenshot(path='verification/screenshots/initial_state.png')

        # 2. Open Settings
        await page.click('text=SYSTEM SETTINGS')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/settings_visible.png')

        # 3. Add Node
        await page.keyboard.press("Escape")
        await asyncio.sleep(1)
        await page.click('button:has-text("+")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/add_node_modal.png')

        # Click OpenRouter (it's a card)
        await page.click('text=OpenRouter')
        await page.click('text=INITIALIZE')
        await asyncio.sleep(1)

        # 4. Check Node and Model Select
        await page.screenshot(path='verification/screenshots/node_added.png')

        # Click the model button to cycle
        await page.click('button:has-text("meta-llama")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/model_cycled.png')

        await browser.close()

if __name__ == "__main__":
    os.makedirs('verification/screenshots', exist_ok=True)
    asyncio.run(verify_app())
