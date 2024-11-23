import esbuild from 'esbuild';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

glob('src/**/handler.ts', (err, files) => {
  if (err) {
    console.error('Failed to find handler files:', err);
    return;
  }

  files.forEach(file => {
    const outPath = file.replace(/^src/, 'dist').replace(/\.ts$/, '.js');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    esbuild.build({
      entryPoints: [file],
      outfile: outPath,
      bundle: true,
      minify: true,
      treeShaking: true,
      platform: 'node',
      target: 'node22',
      external: ['@aws-sdk/client-transcribe'],
    }).catch(() => process.exit(1));
  });
});
