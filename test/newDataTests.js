var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");

describe('Data.insertData', function (){
  it('should insert data without error', function (done){

    var itemToInser = {"value": "test"};

    Data.insertData("test", itemToInser, function (data){
      // console.log(data);
      assert.notStrictEqual(null, data._id);
      assert.strictEqual(itemToInser.value, data.value);
      done();

    });

  });
});
