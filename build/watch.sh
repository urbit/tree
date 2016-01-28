#! /bin/echo "use 'npm run watch' to run this script"
mkdir -p desk/web/tree/; 
watchify -v -o desk/web/tree/main.js js/main.coffee & 
node-sass -w -o desk/web/tree/ css/main.scss main.css