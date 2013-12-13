all: redeploy

start: app.js
	node app.js

clean-start: app.js ./scripts/dropDb.js
	mongo toDoLists ./scripts/dropDb.js
	node app.js

tests: ./scripts/dropTestDb.js
	mongo test ./scripts/dropTestDb.js
	mocha ./test/taskManagerTests.js
	mongo test ./scripts/dropTestDb.js

deploy: app.js ./scripts/dropDb.js ./scripts/dropTestDb.js
	mongo toDoLists ./scripts/dropDb.js
	npm install
	mongo test ./scripts/dropTestDb.js
	mocha
	mongo test ./scripts/dropTestDb.js
	node app.js

redeploy: app.js ./scripts/dropTestDb.js
	mongo test ./scripts/dropTestDb.js
	mocha
	mongo test ./scripts/dropTestDb.js
	node app.js

#all: redeploy
