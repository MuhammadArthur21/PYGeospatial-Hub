"""PyGeospatial Hub - QA Test Script"""
import requests, sys, json, time

BASE = "http://127.0.0.1:8000"
passed = 0
failed = 0
errors = []

def test(name, method, path, expected=200, **kwargs):
    global passed, failed
    url = f"{BASE}{path}"
    try:
        if method == "GET":
            r = requests.get(url, timeout=10, **kwargs)
        else:
            r = requests.post(url, timeout=10, **kwargs)
        if r.status_code == expected:
            passed += 1
            print(f"  OK {name}")
        else:
            failed += 1
            msg = f"  FAIL {name}: got HTTP {r.status_code} - {r.text[:200]}"
            print(msg)
            errors.append(msg)
    except Exception as e:
        failed += 1
        msg = f"  FAIL {name}: {str(e)}"
        print(msg)
        errors.append(msg)

print("=" * 50)
print("PYGEOSPATIAL HUB - QA REPORT")
print("=" * 50)

print("\n[1] BASIC")
test("Root", "GET", "/")
test("Health", "GET", "/health")

print("\n[2] AUTH")
uname = f"qa_{int(time.time())}"
test("Register", "POST", "/api/v1/auth/register", json={"username":uname,"email":f"{uname}@x.co","password":"Test1234"})
test("Login", "POST", "/api/v1/auth/login", json={"username":uname,"password":"Test1234"})

print("\n[3] LIBRARIES")
test("List libs", "GET", "/api/v1/libraries?limit=3")
r = requests.get(f"{BASE}/api/v1/libraries?limit=100")
d = r.json()
total = d.get("total", len(d) if isinstance(d, list) else 0)
print(f"  Total from API: {total}")
if total >= 100:
    print("  OK 100+ libraries")
    passed += 1
else:
    print(f"  FAIL Only {total} (expected 100+)")
    failed += 1
test("Library detail", "GET", "/api/v1/libraries/shapely")
test("Library 404", "GET", "/api/v1/libraries/__bad__", expected=404)

print("\n[4] CATEGORIES")
test("Categories", "GET", "/api/v1/categories")
test("Category detail", "GET", "/api/v1/categories/core_geospatial")

print("\n[5] TOOLS")
test("Tools", "GET", "/api/v1/tools")
test("Tool detail", "GET", "/api/v1/tools/buffer")

print("\n[6] SANDBOX")
test("Execute print", "POST", "/api/v1/sandbox/execute", json={"code":"print(42)","libraries":[]})
test("Execute text", "POST", "/api/v1/sandbox/execute", json={"code":"print('hello world')","libraries":[]})
test("Block dangerous", "POST", "/api/v1/sandbox/execute", json={"code":"import os\nos.system('ls')","libraries":[]})

print("\n[7] COMMUNITY")
test("Create comment", "POST", "/api/v1/comments", json={"target_type":"script","target_id":1,"content":"test","author":"qa"})
test("List comments", "GET", "/api/v1/comments?target_type=script&target_id=1")
test("Upvote", "POST", "/api/v1/votes/upvote", json={"target_type":"script","target_id":1,"user":"qa"})

print("\n[8] SUBSCRIPTIONS")
test("List tiers", "GET", "/api/v1/subscriptions/tiers")
test("Get pro tier", "GET", "/api/v1/subscriptions/tiers/pro")

print("\n[9] DASHBOARD")
test("Dashboard", "GET", "/api/v1/dashboard/summary")

print("\n[10] CONVERTER")
test("Converter", "POST", "/api/v1/converter/convert", json={"source_format":"geojson","target_format":"wkt","data":'{"type":"Point","coordinates":[106.8,-6.2]}'})

print("\n[11] WORKSPACE")
test("Create workspace", "POST", "/api/v1/workspaces", json={"name":"Test","description":"test"})
test("List workspaces", "GET", "/api/v1/workspaces")

total_tests = passed + failed
pct = (passed / total_tests * 100) if total_tests > 0 else 0
print("\n" + "=" * 50)
print(f"RESULTS: {passed}/{total_tests} passed ({pct:.0f}%)")
if errors:
    print("FAILURES:")
    for e in errors:
        print(f"  {e}")
print("=" * 50)
sys.exit(0 if failed == 0 else 1)
