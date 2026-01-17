---
name: create-script
description: Codify discovered processes into standalone, reusable Python scripts. Use when the user has figured out a process (API integration, data pipeline, automation task) and wants to turn it into a reusable script, or when the user says "/create-script".
---

# Create Script Skill

Turn discovered processes into production-ready Python scripts with CLI interfaces.

## When to Use

- After exploring an API and figuring out the request flow
- After solving a data transformation problem
- When automating a manual process
- When the user wants to capture a working solution as a reusable tool

## Workflow

### Step 1: Gather Context

Review the conversation to identify:
- What process was discovered or solved
- What API endpoints, data sources, or operations are involved
- What worked and what didn't (avoid repeating mistakes)

### Step 2: Identify Requirements

Ask about or determine:
- **Inputs**: What data does the script need? (files, API keys, parameters)
- **Outputs**: What should the script produce? (files, stdout, API calls)
- **Configuration**: What might change between runs? (URLs, credentials, options)
- **Error cases**: What can go wrong and how should it be handled?

### Step 3: Design Script Structure

Plan the script organization:
- Break logic into focused functions
- Identify what should be configurable via CLI arguments
- Determine what should come from environment variables (secrets)
- Plan the main flow and error handling

### Step 4: Generate the Script

Create a Python script following the template structure below. Include:
- Clear CLI interface with help text
- Environment variable handling for secrets
- Proper error handling and exit codes
- Logging for visibility into what's happening

### Step 5: Provide Usage Examples

After generating the script:
- Show example invocations
- Document required environment variables
- Suggest next steps (testing, scheduling, extending)

## Script Template

```python
#!/usr/bin/env python3
"""
[Script description - what it does and why]

Usage:
    python script_name.py [options] <arguments>

Examples:
    python script_name.py --input data.json
    python script_name.py --verbose --output results.csv
"""

import argparse
import logging
import os
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def get_config():
    """Load configuration from environment variables."""
    return {
        "api_key": os.environ.get("API_KEY"),
        "base_url": os.environ.get("BASE_URL", "https://api.example.com"),
    }


def validate_config(config):
    """Validate required configuration is present."""
    missing = [k for k, v in config.items() if v is None and k in ["api_key"]]
    if missing:
        logger.error(f"Missing required environment variables: {', '.join(missing)}")
        sys.exit(1)
    return config


def main_logic(args, config):
    """Core script logic goes here."""
    logger.info(f"Processing with input: {args.input}")

    # Implementation here

    return {"status": "success"}


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="[Script description]",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s --input data.json
    %(prog)s --verbose --output results.csv

Environment Variables:
    API_KEY     Required. API authentication key.
    BASE_URL    Optional. API base URL (default: https://api.example.com)
        """
    )

    parser.add_argument(
        "--input", "-i",
        required=True,
        help="Input file path"
    )
    parser.add_argument(
        "--output", "-o",
        default="-",
        help="Output file path (default: stdout)"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable verbose logging"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without making changes"
    )

    return parser.parse_args()


def main():
    """Main entry point."""
    args = parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    try:
        config = validate_config(get_config())
        result = main_logic(args, config)

        if result.get("status") == "success":
            logger.info("Completed successfully")
            sys.exit(0)
        else:
            logger.error(f"Failed: {result.get('error', 'Unknown error')}")
            sys.exit(1)

    except KeyboardInterrupt:
        logger.info("Interrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
```

## CLI Design Guidelines

### Use argparse (standard library)

Prefer argparse over external dependencies like click:
- Zero dependencies means easier distribution
- Familiar to most Python developers
- Sufficient for most CLI needs

### Argument Patterns

**Positional arguments** for required, obvious inputs:
```python
parser.add_argument("filename", help="File to process")
```

**Flags** for optional behavior:
```python
parser.add_argument("--verbose", "-v", action="store_true")
parser.add_argument("--format", choices=["json", "csv"], default="json")
```

**Environment variable fallbacks** for secrets:
```python
parser.add_argument(
    "--api-key",
    default=os.environ.get("API_KEY"),
    help="API key (default: $API_KEY)"
)
```

### Subcommands for Multi-Action Scripts

```python
subparsers = parser.add_subparsers(dest="command", required=True)

fetch_parser = subparsers.add_parser("fetch", help="Fetch data from API")
fetch_parser.add_argument("--since", help="Fetch records since date")

export_parser = subparsers.add_parser("export", help="Export data to file")
export_parser.add_argument("--format", choices=["json", "csv"])
```

## Best Practices

### Environment Variables

- Use for secrets (API keys, passwords, tokens)
- Use for environment-specific config (URLs, paths)
- Document all required/optional env vars in help text
- Validate early and fail fast with clear error messages

### Error Handling

- Catch specific exceptions, not bare `except:`
- Log errors before exiting
- Use appropriate exit codes (0=success, 1=error, 130=interrupted)
- Include context in error messages

### Output

- Default to stdout for piping compatibility
- Use `--output` flag for file output
- Support `-` as stdout alias
- Use JSON for structured output, plain text for human output

### Logging

- Use `logging` module, not `print()`
- Default to INFO level, `--verbose` for DEBUG
- Include timestamps in format
- Log to stderr so stdout stays clean for data

## Examples

### API Client Script

```python
#!/usr/bin/env python3
"""Fetch user data from Example API."""

import argparse
import json
import logging
import os
import sys
import urllib.request
import urllib.error

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


def fetch_user(user_id, api_key, base_url):
    """Fetch a single user by ID."""
    url = f"{base_url}/users/{user_id}"
    headers = {"Authorization": f"Bearer {api_key}"}

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        logger.error(f"HTTP {e.code}: {e.reason}")
        return None


def main():
    parser = argparse.ArgumentParser(description="Fetch user data from Example API")
    parser.add_argument("user_id", help="User ID to fetch")
    parser.add_argument("--api-key", default=os.environ.get("EXAMPLE_API_KEY"))
    parser.add_argument("--base-url", default="https://api.example.com/v1")
    args = parser.parse_args()

    if not args.api_key:
        logger.error("API key required. Set EXAMPLE_API_KEY or use --api-key")
        sys.exit(1)

    user = fetch_user(args.user_id, args.api_key, args.base_url)
    if user:
        print(json.dumps(user, indent=2))
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
```

### Data Transformation Script

```python
#!/usr/bin/env python3
"""Transform CSV data to JSON format."""

import argparse
import csv
import json
import sys


def transform_row(row, columns):
    """Transform a single row to a dictionary."""
    return {col: row.get(col, "") for col in columns}


def main():
    parser = argparse.ArgumentParser(description="Transform CSV to JSON")
    parser.add_argument("input", nargs="?", default="-", help="Input CSV (default: stdin)")
    parser.add_argument("--output", "-o", default="-", help="Output JSON (default: stdout)")
    parser.add_argument("--columns", "-c", help="Comma-separated columns to include")
    parser.add_argument("--pretty", action="store_true", help="Pretty-print JSON output")
    args = parser.parse_args()

    infile = sys.stdin if args.input == "-" else open(args.input)
    outfile = sys.stdout if args.output == "-" else open(args.output, "w")

    try:
        reader = csv.DictReader(infile)
        columns = args.columns.split(",") if args.columns else reader.fieldnames

        results = [transform_row(row, columns) for row in reader]

        indent = 2 if args.pretty else None
        json.dump(results, outfile, indent=indent)
        outfile.write("\n")
    finally:
        if args.input != "-":
            infile.close()
        if args.output != "-":
            outfile.close()


if __name__ == "__main__":
    main()
```

## After Script Creation

1. **Test the script** with sample data
2. **Make executable**: `chmod +x script.py`
3. **Consider adding** to a `scripts/` directory in the project
4. **Document** in README if it's a project utility
