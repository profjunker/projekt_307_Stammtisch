"build-css": "sass --watch public/scss:public/css",
"start": "concurrently \"npm run build-css\" \"nodemon ./bin/www --watch .\"",
,
"build": "sass public/scss:public/css"