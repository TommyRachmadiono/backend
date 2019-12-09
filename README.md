<!-- markdownlint-disable MD033 MD036 -->

<div align=center>

# @acme-bookshop/backend

_Backend app for Acme Bookshop_

This is a boilerplate repo for [DCDC bootcamp participants](http://dilo.id/Event/Detail/551). Finished app will be published after the bootcamp final day (Sunday, 15 December 2019).

</div>

## Development

1. `git clone https://github.com/acme-bookshop/backend.git acme-bookshop-backend`
2. `cd acme-bookshop-backend`
3. `npm install`
4. Copy `.env.example` to `.env` and configure env vars
5. `npm start` or `npm watch`

## Configuration

```bash
# express server hostname and port
APP_HOSTNAME=localhost
APP_PORT=3000

# mongodb hostname, port, and database name
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=acme-bookshop

# if enabled, server will not connect to mongodb
DISABLE_DATABASE=true
```

## Notes

- Project is `npm` based; `yarn` is optional but using `npm` is recommended since `package-lock.json` is commited
- Project includes pre-commit git hook using `husky` which runs `npm run format`

Happy hacking! 🎉
