# deploy and publish
Ayudame a corregir o a hacer los ajustes necesarios para publicar los cambios en github y github pages
Errores: 
1.
Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
Run actions/configure-pages@v5
  with:
    enablement: true
    token: ***
  env:
    PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
Warning: Get Pages site failed. Error: Not Found - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
Error: Create Pages site failed. Error: Resource not accessible by integration - https://docs.github.com/rest/pages/pages#create-a-apiname-pages-site
Error: HttpError: Resource not accessible by integration - https://docs.github.com/rest/pages/pages#create-a-apiname-pages-site

2. 

Run pnpm test
$ pnpm --filter @deandre-dock/buttons test
$ vitest run

 RUN  v1.6.1 /home/runner/work/dock/dock/packages/core

include: **/*.{test,spec}.?(c|m)[jt]s?(x)
exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*
watch exclude:  **/node_modules/**, **/dist/**

No test files found, exiting with code 1
/home/runner/work/dock/dock/packages/core:
[ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL] @deandre-dock/buttons@0.1.0 test: `vitest run`
Exit status 1
[ELIFECYCLE] Test failed. See above for more details.
Error: Process completed with exit code 1.

3. 
Run pnpm build:core
$ pnpm --filter @deandre-dock/buttons build
$ vite build && tsc --emitDeclarationOnly
vite v5.4.21 building for production...
transforming...
✓ 17 modules transformed.
rendering chunks...

[vite:dts] Start generate declaration files...
computing gzip size...
dist/style.css   6.24 kB │ gzip: 1.37 kB
dist/index.js   14.66 kB │ gzip: 4.31 kB
[vite:dts] Start rollup declaration files...
Analysis will use the bundled TypeScript version 5.9.3
[vite:dts] Declaration files built in 1590ms.

dist/style.css   6.24 kB │ gzip: 1.37 kB
dist/index.cjs  10.62 kB │ gzip: 3.73 kB
✓ built in 1.79s
error TS6059: File '/home/runner/work/dock/dock/packages/core/vite.config.ts' is not under 'rootDir' '/home/runner/work/dock/dock/packages/core/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern 'vite.config.ts' in '/home/runner/work/dock/dock/packages/core/tsconfig.json'
/home/runner/work/dock/dock/packages/core:
[ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL] @deandre-dock/buttons@0.1.0 build: `vite build && tsc --emitDeclarationOnly`
Exit status 2
[ELIFECYCLE] Command failed with exit code 2.
Error: Process completed with exit code 2.