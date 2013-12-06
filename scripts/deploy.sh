#DEPLOY APP

#install modules
echo "***### INSTALL NODE MODULES ###***"
npm install

#drop database
echo "***### DROP DATABASE ###***"
mongo toDoLists ./scripts/dropDb.js

#run tests
echo "***### CLEAN BEFORE TESTS ###***"
mongo test ./scripts/dropDb.js

echo "***### RUN TESTS ###***"
mocha

echo "***### CLEAN AFTER TESTS ###***"
mongo test ./scripts/dropDb.js

#run app
echo "***### RUN APPLICATION ###***"
node app.js
