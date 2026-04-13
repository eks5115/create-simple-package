import * as esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/app.esbuild.js',
  minify: true,
}).catch(e => {
  console.error(e)
})
