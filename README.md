#pz-to-do-lists

##Ubuntu notes

How to install `Node.JS` version `0.10`:

	sudo apt-get update
	sudo apt-get install python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

Then install `npm` (`node package manager`):

	sudo apt-get install npm

Finally add `alias` to your `~/.bashrc`:

	alias 'node'='nodejs'

##Install

	npm install

##Database notes

##Run

	node app.js

#Work schedule

###Task 1 
Users' managment `24.10.2013 16:00` 
###Task 2 
Lists' managment `07.11.2013 18:00` 
###Task 3 
Tasks' managment `21.11.2013 18:00` 
###Task 4 
Groups' managment `05.12.2013 18:00` 
###Task 5 
Group's lists' and tasks' management `19.12.2013 18:00` 
###Task 6 
Incoming tasks etc. `02.01.2014 18:00` 
###Extra time 
Two weeks just in case `16.01.2014 18:00`

#Docs

##data.js

####findOrCreateUser

####updateUser

####removeUser

##user.js

####login

####logout

####getLogin

##server.js