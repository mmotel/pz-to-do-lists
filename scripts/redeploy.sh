#REDEPLOY APP

#run tests
echo "***### CLEAN BEFORE TESTS ###***"
mongo test ./scripts/dropTestDb.js

echo "***### RUN TESTS ###***"
mocha

echo "***### CLEAN AFTER TESTS ###***"
mongo test ./scripts/dropTestDb.js

#run app
echo "***### RUN APPLICATION ###***"
node app.js
