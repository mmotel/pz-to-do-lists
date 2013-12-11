start: app.js
	node app.js
clean-start: app.js ./scripts/dropDb.js
	mongo ./scripts/dropDb.js
	node app.js
deploy: app.js ./scripts/dropDb.js ./scripts/dropTestDb.js
	mongo ./scripts/dropDb.js
	npm install
	mongo ./scripts/dropTestDb.js
	mocha
	mongo ./scripts/dropTestDb.js
	node app.js

redeploy: app.js ./scripts/dropTestDb.js
	mongo ./scripts/dropTestDb.js
	mocha
	mongo ./scripts/dropTestDb.js
	node app.js

all: redeploy
