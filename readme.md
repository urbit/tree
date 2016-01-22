# `tree`

`tree` is a single page app for browsing files in `%clay` and loading modular urbit apps, like `talk`.

`tree` is a fairly straightforward [flux](https://facebook.github.io/flux/) app.  Because pages load inside of a [react](https://facebook.github.io/react/) environment you can use JSX to invoke components found in `components/` in this repo.

`tree` ships as compiled `main.js` and `main.css` on your urbit.  If you want to make changes or develop on top, you'll need these source files. 

# Developing

## JavaScript

In `js/`:

`npm install`
`watchify -v -t coffeeify -o main.js main.coffee`

## CSS

Our sass depends on bootstrap mixins, so the urbit fork of bootstrap is included as a submodule. 

First:

`git submodule init`
`git submodule update --remote`

Then, in `./`:

`sass --watch css/main.scss:main.css`

