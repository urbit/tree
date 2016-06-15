# `tree`

`tree` is a single page app for browsing files in `%clay` and loading modular [urbit](http://github.com/urbit/urbit) apps, like `talk`.

`tree` is a fairly straightforward [flux](https://facebook.github.io/flux/) app.  Because pages load inside of a [react](https://facebook.github.io/react/) environment you can use JSX to invoke components found in `components/` in this repo.

`tree` ships as compiled `main.js` and `main.css` on your urbit (in `/home/web/tree`).  If you want to make changes or develop on top, you'll need these source files.

# Developing

The `desk/` folder in this repo mirrors a desk on an urbit `planet`.  Source files live outside of this folder, we compile them in using watchify / sass and then copy the `/desk` onto the desk we're using for development on a planet.

Our sass depends on bootstrap mixins, so the urbit fork of bootstrap is included as a submodule.

First:

```
git submodule init
git submodule update --remote
```

Then:

```
npm install
npm run watch
```

## Deploy

Simple:

`cp -r desk/ [$desk_mountpoint]/`

If you have urbit installed in `~/urbit` with a planet called `sampel-sipnym` and have mounted the `home` desk:

`cp -r desk/ ~/urbit/sampel-sipnym/home/`

Then use the `?dbg.nopack=true` query string to test:

`http://localhost:8080/some/page?dbg.nopack=true`

Your Urbit links to the concatenated JS / CSS by default.  This query string loads the scripts directly.  See below for more information.

# Contributing

If you have a patch you'd like to contribute:

- Test your changes using the above instructions
- Fork this repo
- Send us a pull request

# Distribution

Compiled `main.js` and `main.css` get periodically shipped to the [urbit core](http://github.com/urbit/urbit).  Each time these compiled files are moved to urbit core their commit message should contain the sha-1 of the commit from this repo.  
