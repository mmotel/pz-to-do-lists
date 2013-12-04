#DEPLOY APP

#install modules
echo "***### INSTALL NODE MODULES ###***"
npm install

#drop database
echo "***### DROP DATABASE ###***"
mongo toDoLists dropDb.js

#run tests
#echo "***### RUN TESTS ###***"
#node tests.js

#echo "***### CLEAN AFTER TESTS ###***"
#mongo dropTests.js

#run app
echo "***### RUN APPLICATION ###***"
node app.js
