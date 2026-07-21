# Quick test - check services work
from app.services.library_service import LibraryService

cats = LibraryService.get_categories()
print(f"Categories: {len(cats)}")
for c in cats:
    libs = c.get("libraries", [])
    print(f"  - {c['id']}: {len(libs)} libraries")

all_libs = LibraryService.get_all_libraries()
print(f"\nTotal libraries: {len(all_libs)}")
for lib in all_libs[:5]:
    print(f"  - {lib['name']} ({lib.get('difficulty', '?')})")
