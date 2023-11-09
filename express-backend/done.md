# Backend

## Dev Env

```
/work/arcadia # npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (arcadia) 
version: (1.0.0) 0.0.1-alpha1
description: Backend for FHJ Hackathon project Arcadia
entry point: (index.js) app.js
test command: 
git repository: https://git-iit.fh-joanneum.at/swd22-hackathon/arcadia.git
keywords: game
author: Walter Reiner
license: (ISC) GPLv3
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "GPL-3.0-or-later".
license: (ISC) GPL-3.0-or-later
About to write to /work/arcadia/package.json:

{
  "name": "arcadia",
  "version": "0.0.1-alpha1",
  "description": "Backend for FHJ Hackathon project Arcadia",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://git-iit.fh-joanneum.at/swd22-hackathon/arcadia.git"
  },
  "keywords": [
    "game"
  ],
  "author": "Walter Reiner",
  "license": "GPL-3.0-or-later"
}


Is this OK? (yes) 
```

## soso

```
/work/src # express --view=pug arcadia

   create : arcadia/
   create : arcadia/public/
   create : arcadia/public/javascripts/
   create : arcadia/public/images/
   create : arcadia/public/stylesheets/
   create : arcadia/public/stylesheets/style.css
   create : arcadia/routes/
   create : arcadia/routes/index.js
   create : arcadia/routes/users.js
   create : arcadia/views/
   create : arcadia/views/error.pug
   create : arcadia/views/index.pug
   create : arcadia/views/layout.pug
   create : arcadia/app.js
   create : arcadia/package.json
   create : arcadia/bin/
   create : arcadia/bin/www

   change directory:
     $ cd arcadia

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=arcadia:* npm start

/work/src # ls
arcadia
/work/src # ls
arcadia
/work/src # mv arcadia ..
/work/src # cd ..
/work # rmdir src/
/work # ls
Dockerfile  arcadia     arcadia.x   done.md
/work # chown 1000:985 -R arcadia
/work # cd arcadia
/work/arcadia # ls
app.js        bin           package.json  public        routes        views
/work/arcadia # npm install
npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.

added 125 packages, and audited 126 packages in 8s

10 packages are looking for funding
  run `npm fund` for details

7 vulnerabilities (2 low, 5 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues, run:
  npm audit fix --force

Run `npm audit` for details.
/work/arcadia # 
```
