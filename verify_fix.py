import asyncio
from playwright.async_api import async_playwright
import os

async def verify_app():
    async with async_playwright() as p:
        # Launch the electron app
        # Note: we need to point to the entry point.
        # Since I've updated the code, I'll use the electron command.
        browser = await p.chromium.launch(executable_path='node_modules/.bin/electron', args=['.'])
        page = await browser.new_context().new_page()

        # Wait for app to load
        await asyncio.sleep(5)

        # 1. Check Sidebar is empty (as per requirement)
        # Assuming the sidebar has a "Initialize your workspace" or similar
        await page.screenshot(path='verification/screenshots/initial_state.png')

        # 2. Open Settings
        await page.click('text=SYSTEM SETTINGS')
        await asyncio.sleep(2)
        await page.screenshot(path='verification/screenshots/settings_visible.png')

        # Verify fields
        fields = ["Gemini", "Perplexity", "OpenRouter", "Kimi", "Claude"]
        for field in fields:
            visible = await page.locator(f'text={field}').is_visible()
            print(f"Field {field} visible: {visible}")

        # Close settings
        await page.keyboard.press("Escape")
        await asyncio.sleep(1)

        # 3. Add a Node
        await page.click('button:has-text("+")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/add_node_modal.png')

        # Select OpenRouter
        await page.click('text=OpenRouter')
        await page.click('text=INITIALIZE')
        await asyncio.sleep(1)

        # 4. Check Node status
        await page.screenshot(path='verification/screenshots/node_added.png')
        print("Node status:", await page.locator('.sidebar-node-card').inner_text())

        await browser.close()

if __name__ == "__main__":
    os.makedirs('verification/screenshots', exist_ok=True)
    asyncio.run(verify_app())
