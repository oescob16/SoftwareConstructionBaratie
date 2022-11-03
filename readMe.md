# Project Baratie
## How to start from scratch

1. Install Node.js located [HERE](https://nodejs.org/en/)
2. Git pull from this github to get all starting configuration files
3. In your terminal at the projects location run ``npm i webpack webpack-cli -D``
4. In your terminal at the projects location run ``npm run build``
5. In your terminal at the projects location run ``npm install firebase``

## Important Notes
* Do not edit anything in ``node_modules``, ``package-lock.json``, ``package.json``, ``webpack.config.js``, or ``firebase.Config.js`` without letting the team know. These are core files that can brick the project.
* All ``.js`` files that contain logic go in the **src** folder. And all ``.html`` files go in the **dist** folder.
* When editing files always save files with ``ctrl + s`` otherwise webpack will run with the previous contents of the file rather than the new updated contents
* Everytime you want to test functionaly with a live server you neeeeeeeed to run ``npm run build``  
* If using VScode you can install an extension called ``liveserver`` to run the webpage