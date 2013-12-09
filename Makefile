deploy: ./scripts/dropDb.js ./scripts/dropTestDb.js
	mongo ./scripts/dropDb.js
	npm install
	mongo ./scripts/dropTestDb.js
	mocha
	mongo ./scripts/dropTestDb.js
	node app.js

redeploy: ./scripts/dropTestDb.js
	mongo ./scripts/dropTestDb.js
	mocha
	mongo ./scripts/dropTestDb.js
	node app.js

all: redeploy
