# PyGeospatial Hub - Developer Guide

## Project Structure

```
backend/
├── app/
│   ├── api/           # API route handlers
│   ├── models/        # SQLAlchemy models
│   ├── services/      # Business logic
│   ├── geo_libs/      # Library wrappers
│   ├── tools/         # Pre-built tools
│   ├── utils/         # Utilities
│   └── middleware/    # Auth, rate limiting, error handling
├── tests/             # Test files
└── notebooks/         # Jupyter notebooks

frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API client services
│   ├── hooks/         # React hooks
│   └── styles/        # Global styles
```

## Adding a New Library Wrapper

1. Create a new file in `backend/app/geo_libs/<category>/`
2. Import and expose the library's core functionality
3. Add the library to `data/metadata/libraries_registry.json`
4. Add to `backend/requirements.txt`

## Adding a New Tool

1. Create the tool script in `backend/app/tools/`
2. Add UI entry in Tools Marketplace page
3. Document the tool

## Code Style
- Python: Follow PEP 8
- JavaScript/React: Follow ESLint config
- Use meaningful variable names
- Add docstrings to all Python functions
