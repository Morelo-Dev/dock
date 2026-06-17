Deploy and publish error

1
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

2.

onfiguration file: none
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
  Liquid Exception: Liquid syntax error (line 94): Variable '{{ colors: { primary: '#7c3aed' }' was not properly terminated with regexp: /\}\}/ in README.md
/usr/local/bundle/gems/liquid-4.0.4/lib/liquid/block_body.rb:136:in `raise_missing_variable_terminator': Liquid syntax error (line 94): Variable '{{ (Liquid::SyntaxError)
  colors: { primary: '#7c3aed' }' was not properly terminated with regexp: /\}\}/
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/block_body.rb:128:in `create_variable'
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/block_body.rb:39:in `parse'
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/document.rb:10:in `parse'
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/document.rb:5:in `parse'
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/template.rb:130:in `parse'
	from /usr/local/bundle/gems/liquid-4.0.4/lib/liquid/template.rb:114:in `parse'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/liquid_renderer/file.rb:13:in `block in parse'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/liquid_renderer/file.rb:49:in `measure_time'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/liquid_renderer/file.rb:12:in `parse'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/renderer.rb:121:in `render_liquid'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/renderer.rb:79:in `render_document'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/renderer.rb:62:in `run'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:479:in `render_regenerated'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:472:in `block in render_pages'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:471:in `each'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:471:in `render_pages'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:192:in `render'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/site.rb:71:in `process'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/command.rb:28:in `process_site'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/commands/build.rb:65:in `build'
	from /usr/local/bundle/gems/jekyll-3.10.0/lib/jekyll/commands/build.rb:36:in `process'
	from /usr/local/bundle/gems/github-pages-232/bin/github-pages:70:in `block (3 levels) in <top (required)>'
	from /usr/local/bundle/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `block in execute'
	from /usr/local/bundle/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `each'
	from /usr/local/bundle/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `execute'
	from /usr/local/bundle/gems/mercenary-0.3.6/lib/mercenary/program.rb:42:in `go'
	from /usr/local/bundle/gems/mercenary-0.3.6/lib/mercenary.rb:19:in `program'
	from /usr/local/bundle/gems/github-pages-232/bin/github-pages:6:in `<top (required)>'
	from /usr/local/bundle/bin/github-pages:25:in `load'
	from /usr/local/bundle/bin/github-pages:25:in `<main>'
Error:  Logging at level: debug GitHub Pages: github-pages v232 GitHub Pages: jekyll v3.10.0 Theme: jekyll-theme-primer Theme source: /usr/local/bundle/gems/jekyll-theme-primer-0.6.0 Requiring: jekyll-github-metadata Requiring: jekyll-seo-tag Requiring: jekyll-coffeescript Requiring: jekyll-commonmark-ghpages Requiring: jekyll-gist Requiring: jekyll-github-metadata Requiring: jekyll-paginate Requiring: jekyll-relative-links Requiring: jekyll-optional-front-matter Requiring: jekyll-readme-index Requiring: jekyll-default-layout Requiring: jekyll-titles-from-headings GitHub Metadata: Initializing... Source: /github/workspace/. Destination: /github/workspace/./_site Incremental build: disabled. Enable with --incremental Generating... Generating: JekyllOptionalFrontMatter::Generator finished in 0.000725189 seconds. Generating: JekyllReadmeIndex::Generator finished in 0.002514266 seconds. Generating: Jekyll::Paginate::Pagination finished in 7.925e-06 seconds. Generating: JekyllRelativeLinks::Generator finished in 0.001274095 seconds. Generating: JekyllDefaultLayout::Generator finished in 0.000216489 seconds. Requiring: kramdown-parser-gfm Generating: JekyllTitlesFromHeadings::Generator finished in 0.011294722 seconds. Rendering: assets/css/style.scss Pre-Render Hooks: assets/css/style.scss Rendering Markup: assets/css/style.scss Rendering: CHANGELOG.md Pre-Render Hooks: CHANGELOG.md Rendering Markup: CHANGELOG.md Rendering Layout: CHANGELOG.md Layout source: theme GitHub Metadata: Generating for deandrenn2/dock GitHub Metadata: Calling @client.repository("deandrenn2/dock", {:accept=>"application/vnd.github.drax-preview+json"}) GitHub Metadata: Calling @client.pages("deandrenn2/dock", {}) Rendering: CLAUDE.md Pre-Render Hooks: CLAUDE.md Rendering Markup: CLAUDE.md Rendering Layout: CLAUDE.md Layout source: theme Rendering: openspec/changes/fix-ci-pipeline/design.md Pre-Render Hooks: openspec/changes/fix-ci-pipeline/design.md Rendering Markup: openspec/changes/fix-ci-pipeline/design.md Rendering Layout: openspec/changes/fix-ci-pipeline/design.md Layout source: theme Rendering: openspec/changes/fix-ci-pipeline/proposal.md Pre-Render Hooks: openspec/changes/fix-ci-pipeline/proposal.md Rendering Markup: openspec/changes/fix-ci-pipeline/proposal.md Rendering Layout: openspec/changes/fix-ci-pipeline/proposal.md Layout source: theme Rendering: openspec/changes/fix-ci-pipeline/specs/cn-unit-tests/spec.md Pre-Render Hooks: openspec/changes/fix-ci-pipeline/specs/cn-unit-tests/spec.md Rendering Markup: openspec/changes/fix-ci-pipeline/specs/cn-unit-tests/spec.md Rendering Layout: openspec/changes/fix-ci-pipeline/specs/cn-unit-tests/spec.md Layout source: theme Rendering: openspec/changes/fix-ci-pipeline/tasks.md Pre-Render Hooks: openspec/changes/fix-ci-pipeline/tasks.md Rendering Markup: openspec/changes/fix-ci-pipeline/tasks.md Rendering Layout: openspec/changes/fix-ci-pipeline/tasks.md Layout source: theme Rendering: openspec/ideas.md Pre-Render Hooks: openspec/ideas.md Rendering Markup: openspec/ideas.md Rendering Layout: openspec/ideas.md Layout source: theme Rendering: openspec/task.md Pre-Render Hooks: openspec/task.md Rendering Markup: openspec/task.md Rendering Layout: openspec/task.md Layout source: theme Rendering: README.md Pre-Render Hooks: README.md Rendering Liquid: README.md github-pages 232 | Error: Liquid syntax error (line 94): Variable '{{ colors: { primary: '#7c3aed' }' was not properly terminated with regexp: /\}\}/ 