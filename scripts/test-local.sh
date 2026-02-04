#!/usr/bin/env bash
# Local test for create-audora-next CLI: base template, blog template, error cases, build.
# Run from repo root: bun run test:local

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_DIR="${AUDORA_TEST_DIR:-/tmp/audora-cli-test}"
CLI="$REPO_ROOT/index.ts"

cleanup() {
  rm -rf "$TEST_DIR/test-audora-base" "$TEST_DIR/test-audora-blog" "$TEST_DIR/test-audora-blog2"
}
trap cleanup EXIT

mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo "=== 1. Base template ==="
bun "$CLI" test-audora-base
test -f test-audora-base/.env.example
test -f test-audora-base/src/app/page.tsx
test ! -d test-audora-base/src/app/blogs
echo "Base template OK"

echo ""
echo "=== 2. Blog template ==="
bun "$CLI" test-audora-blog --blog
test -f test-audora-blog/src/app/blogs/page.tsx
test -f test-audora-blog/src/blogs/data/mdx.ts
test -d test-audora-blog/src/blogs/content
echo "Blog template OK"

echo ""
echo "=== 3. Error cases ==="
bun "$CLI" 2>/dev/null && exit 1 || true
bun "$CLI" --blog 2>/dev/null && exit 1 || true
bun "$CLI" "bad name!" 2>/dev/null && exit 1 || true
bun "$CLI" test-audora-base 2>/dev/null && exit 1 || true
echo "Error cases OK"

echo ""
echo "=== 4. Build sanity check ==="
cd test-audora-base
bun install --silent
bun run build
cd ..
echo "Build OK"

echo ""
echo "All local tests passed."
