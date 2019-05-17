1\. Set environment variables:
```
NODE_ENV=...            # dev|prod
DB_HOST=...             # host on which the database is located
DB_USERNAME=...         # DB username 
DB_PASSWORD=...         # DB password
DB_DATABASE=...         # DB name
AUTH0_DOMAIN=...        # Auth0 > Applications > {YourApp} > Settings > Domain
AUTH0_CLIENT_ID=...     # Auth0 > Applications > {YourApp} > Settings > Client ID
AUTH0_CLIENT_SECRET=... # Auth0 > Applications > {YourApp} > Settings > Client Secret
MAILER_HOST=...         # server host for sending E-mails   
MAILER_PORT=...         # port on the server for sending E-mails
MAILER_USER=...         # username from mailer server
MAILER_PASS=...         # password from mailer server
```
Other environment variables you can see in `server/configs.js`

2\. Run:
```
npm i           # install required dependencies
npm run create  # create empty DB by set environment variables
npm run sync    # create tables in DB
npm run build   # build React.js application
hpm run start   # run server
```