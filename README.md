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

#Work schedule

###Task 1 
Users' managment `27.10.2013 16:00` `DONE`
###Task 2 
Lists' managment `14.11.2013 18:00` `DONE`
###Task 3 
Tasks' managment `15.12.2013 18:00` `DONE`
###Task 4 
Groups' managment `29.12.2013 18:00` `new deadline`
###Task 5 
Group's lists' and tasks' management `09.01.2014 18:00` `new deadline`
###Task 6 
Incoming tasks etc. `16.01.2014 18:00` `new deadline`

#[Docs (wiki)](https://github.com/mmotel/pz-to-do-lists/wiki)

###[Data.js](https://github.com/mmotel/pz-to-do-lists/wiki/data-js)

###DataManager.js

###[User.js](https://github.com/mmotel/pz-to-do-lists/wiki/user-js)

###[Utils.js](https://github.com/mmotel/pz-to-do-lists/wiki/utils-js)
