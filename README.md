#### Semper LLC Administrator UI
This is a simple page CRUD Admin UI for the semper LLC API. Its still in development. Security
has been turned off until its ready for real data and production.

    http://semper-admin.herokuapp.com

### Layout
Note, there are two difference package.json files. The first
is for the Herok express app, and the second is for the RequireJS
Browserify Angular App. This was done to allow the heroku app
to run node 20. The folder with the app is designed to enable 
a docker setup that will use a node 10 environment to build 
the legacy app.

The docker app is not designed to run in prodcution, its 
just there for a container that will support the legacy 
version of node and python 2, needed by the `gulp-sass' 
package and the gulp processes.

### Install
Use the following to install the required packages.

    npm install

### Testing and Development

    npm start

### Reference
This project is based upon the ng-admin project on github.

https://github.com/marmelab/ng-admin

### Deployment (READ ME NOW)
This code uses a bundle file. Which needs to be manually uodated using the `npm js` command.
Commit the code repo so its available on launch. The bundle will not build on its own,
as the server runs in heroku. 

### Local Development and Changes
Use this command to run the Docker compose setup.

``` docker-compose up ```

or you can run it directly for docker.

``` docker build -t node-10-semper4 . ```
``` docker run -p 9001:9001 node-10-semper ```

### Local Development
The following are the steps needed to run a local development 
environment that allows the docker to run in node 10.10.0, but 
build code that can be deployed to a node 20 on Heroku. 

### Node Version Confusion?
This code was built using node 10.0.0 and and AngularJs 1.4.2 
and uses the RequireJS pattern. This code is not ES6 compliant,
and the tooling needed to build using the gulp command are not 
upgradable. 

The code assume:
1. Python 2 (needed for gulp-sass)
2. Node 10.10.0 
3. RequireJS and AngularJS.

### Hints & Helpers
Use this command to prune off the old containers.
``` docker container prune -f ```

Use this to build the image, with the cache turned off.
``` docker build -t --no-cache node-10-semper4 . ```

Use this to run and bash into the container.
```  docker run -it node-10-semper /bin/bash ```

To do a proper build:
1. Cd into the /app folder.
2. Run the docker build to create the image
``` docker build -t node-10-server . ```
3. Run the docker in interative mode 
``` docker run -v ./dist:/app/dist -it node-10-server /bin/bash ```
4. Inside the docker run the gulp.
``` gulp js script sass ```
5. Exit the Docker image and commit the code.
6. Push to production.