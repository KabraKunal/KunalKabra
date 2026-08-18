# Morning Intelligence static bundle

This Vite app publishes the complete Morning Intelligence dashboard at
`https://kunalkabra.com/intelligence/`.

The daily publishing flow updates `src/data.ts` (and any intentionally changed
dashboard source files), then runs:

```sh
npm run build
```

The deterministic production bundle is written to the sibling
`../intelligence/` directory for GitHub Pages.
