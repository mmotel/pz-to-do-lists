#REDEPLOY APP

#run tests
echo "***### RUN TESTS ###***"
mocha

echo "***### CLEAN AFTER TESTS ###***"
mongo test ./scripts/dropDb.js

#run app
echo "***### RUN APPLICATION ###***"
node app.js
