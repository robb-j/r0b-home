# www.r0b.io [![Netlify Status](https://api.netlify.com/api/v1/badges/ed3d45ba-da8f-471d-9e03-da6a2e4668ec/deploy-status)](https://app.netlify.com/sites/sharp-newton-2d30e6/deploys)

My personal website, a static site generated with [11ty](https://www.11ty.dev/)
using [@openlab/alembic](https://github.com/digitalinteraction/alembic/)
and pushed to [www.r0b.io](https://www.r0b.io).

## dev scripts

```sh
# Run the generator
# -> .eleventy.js is the entrypoint
# -> Outputs to _site which is git-ignored
npm run build

# Run the dev server
# -> Runs on http://localhost:3000
# -> Reloads on change using BrowserSync
npm run serve

# Manually lint code
npm run lint

# Manually format code
npm run format
```

## dev setup

- prettier.io on git commit
- TypeScript javascript errors
- editorconfig for indentation management

## future work

- n/a

## merge todos

- merge alembic fixes back
- cool cards thingy
