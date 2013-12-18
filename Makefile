all: run

start: app.js
	node app.js

clean-start: app.js ./scripts/dropDb.js
	mongo toDoLists ./scripts/dropDb.js
	node app.js

tests: ./scripts/dropTestDb.js
	mongo test ./scripts/dropTestDb.js
	mocha ./test/userManagerTests.js
	mongo test ./scripts/dropTestDb.js
	mocha ./test/listManagerTests.js
	mongo test ./scripts/dropTestDb.js
	mocha ./test/taskManagerTests.js
	mongo test ./scripts/dropTestDb.js
	mocha ./test/userTests.js
	mongo test ./scripts/dropTestDb.js

install: package.json
	npm install

deploy: install tests clean-start

redeploy: tests clean-start

run: tests start
