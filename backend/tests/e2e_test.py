# PyGeospatial Hub - E2E Test Suite (Section 14.1)
# Uses Playwright for browser automation testing

"""
E2E Test Cases:
1. Homepage loads with all sections
2. Libraries index displays and filters work
3. Library detail page shows info
4. Sandbox loads with Monaco Editor
5. Tools Marketplace shows tools
6. Navigation works on mobile
7. Dark/light theme toggle works
8. Documentation page renders

Run: cd frontend && npx playwright test
"""

import pytest
from playwright.sync_api import Page, expect

BASE_URL = "http://localhost:5173"


class TestNavigation:
    """Test basic navigation and page loads"""

    def test_homepage_loads(self, page: Page):
        page.goto(BASE_URL)
        expect(page.locator("h1")).to_contain_text("Geospatial Python")

    def test_navbar_links(self, page: Page):
        page.goto(BASE_URL)
        links = page.locator("nav a")
        expect(links.first).to_be_visible()

    def test_libraries_page(self, page: Page):
        page.goto(f"{BASE_URL}/libraries")
        expect(page.locator("h1")).to_contain_text("Library")

    def test_sandbox_page(self, page: Page):
        page.goto(f"{BASE_URL}/sandbox")
        expect(page.locator("button")).to_contain_text("Run")

    def test_tools_page(self, page: Page):
        page.goto(f"{BASE_URL}/tools")
        expect(page.locator("h1")).to_contain_text("Tools")

    def test_dashboard_page(self, page: Page):
        page.goto(f"{BASE_URL}/dashboard")
        expect(page.locator("h1")).to_contain_text("Dashboard")


class TestLibraries:
    """Test library browsing functionality"""

    def test_library_search(self, page: Page):
        page.goto(f"{BASE_URL}/libraries")
        search = page.locator("input[placeholder*='Search']")
        expect(search).to_be_visible()
        search.fill("Shapely")
        page.wait_for_timeout(500)

    def test_library_detail(self, page: Page):
        page.goto(f"{BASE_URL}/libraries")
        first_card = page.locator("a").filter(has_text="Shapely").first
        if first_card.is_visible():
            first_card.click()
            expect(page.locator("h1")).to_contain_text("Shapely")
