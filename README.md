#pz-to-do-lists

##Ubuntu notes

How to install `Node.JS` version `0.10`:

```sh
sudo apt-get update
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

##Database notes

##Deployment

To deploy and redeploy application use [Makefile](./Makefile). 

####Build new deploy

Makefile drops collections from database, installs node packages, runs tests and then starts application.

Use:

```sh
make deploy
```

####Redeploy application

Makefile drops collections from database, runs tests and then starts application.

Use:

```sh
make redeploy
```

####Run application

Makefile runs tests and then starts application.

```sh
make run
```

Or just:

```sh
make
```
