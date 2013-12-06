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

describe('Data.findData', function (){
  it('should return data if it exists', function (done){

    var itemToInser = {"value": "test", "trash": false};

    Data.insertData("test", itemToInser, function (data){
      // console.log(data);
      assert.notStrictEqual(null, data._id);
      assert.strictEqual(itemToInser.value, data.value);
      
      Data.findData("test", {"_id": data._id}, function (foundData){
        // console.log(foundData);
        // assert.equal(data._id, foundData._id); //throws exception
        assert.equal(data._id.toString(), foundData._id.toString()); //works, leo why?!
        assert.strictEqual(data.value, foundData.value);
        done();
      });

    });

  });
  
  it('should return null if data dose not exists', function (done){
    Data.findData("test", {"_id": 0}, function (foundData2){
      // console.log(foundData2);
      assert.strictEqual(null, foundData2);
      done();
    });
  });

});
