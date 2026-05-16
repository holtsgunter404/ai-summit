import asyncio
from playwright.async_api import async_playwright
import os

async def verify_app():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err.message}"))

        print("Navigating to app...")
        await page.goto("http://localhost:5173")
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(3)

        # 1. Initial State
        print("Taking initial screenshot...")
        await page.screenshot(path='verification/screenshots/main_page.png')

        # 2. Open Settings
        print("Opening Settings...")
        # Sidebar footer has "System Settings" button
        await page.click('text=System Settings')
        await asyncio.sleep(2)
        await page.screenshot(path='verification/screenshots/settings_fixed.png')

        # 3. Add Node
        print("Closing settings and opening Add Node...")
        await page.keyboard.press("Escape")
        await asyncio.sleep(1)
        # Look for the Plus button in Sidebar. It has a Plus icon.
        # It's better to find it by class or relative position.
        # Or just use the "Initialize Node" button in the empty state.
        await page.click('text=Initialize Node')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/add_node_modal.png')

        # Select OpenRouter
        print("Initializing OpenRouter node...")
        await page.click('text=OpenRouter')
        await page.click('text=INITIALIZE')
        await asyncio.sleep(1)

        # 4. Check Node added
        print("Verifying node addition...")
        await page.screenshot(path='verification/screenshots/node_added.png')

        # Cycle model
        print("Cycling model...")
        # The model button has the model name. Llama is default.
        await page.click('button:has-text("meta-llama")')
        await asyncio.sleep(1)
        await page.screenshot(path='verification/screenshots/model_cycled.png')

        await browser.close()

if __name__ == "__main__":
    os.makedirs('verification/screenshots', exist_ok=True)
    asyncio.run(verify_app())
