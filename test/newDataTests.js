var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");

describe('Data.insertData', function (){
  it('should insert data without error', function (done){

    var itemToInser = {"value": "test"};

    Data.insertData("test", itemToInser, function (err, data){
      // console.log(data);
      if(err){
        done(err);
      }
      else{
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);
        done();
      }
    });
  });

});

describe('Data.findData', function (){
  it('should return data if it exists', function (done){

    var itemToInser = {"value": "test", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        // console.log(data);
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);
        
        Data.findData("test", {"_id": data._id}, function (err, foundData){
          if(err){
            done(err);
          }
          else{
            // console.log(foundData);
            // assert.equal(data._id, foundData._id); //throws exception
            assert.equal(data._id.toString(), foundData._id.toString()); //works, leo why?!
            assert.strictEqual(data.value, foundData.value);
            done();
          }
        });
      }
    });
  });
  
  it('should return null if data dose not exists', function (done){
    Data.findData("test", {"_id": 0}, function (err, foundData2){
      if(err){
        done(err);
      }
      else{
        // console.log(foundData2);
        assert.strictEqual(null, foundData2);
        done();
      }
    });
  });

});

describe('Data.updateData', function (){
  it('should return 1 and update data if it exists', function (done){

    var itemToInser = {"value": "test", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        // console.log(data);
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);

        var itemUpdateValue = "updated";

        Data.updateData("test", {"_id": data._id}, {"value": itemUpdateValue} , function (result){
          // console.log(result);
          assert.strictEqual(1, result);

          Data.findData("test", {"_id": data._id}, function (err, foundData){
            if(err){
              done(err);
            }
            else{
              // console.log(foundData);
              assert.strictEqual(data._id.toString(), foundData._id.toString());
              assert.strictEqual(itemUpdateValue, foundData.value);
              done();
            }
          });
        });
      }
    });
  });

  it('should return 0 if data do not exists', function (done){

    var itemToInser = {"value": "test", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        // console.log(data);
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);

        var itemUpdateValue = "updated";

        Data.updateData("test", {"_id": 0}, {"value": itemUpdateValue} , function (result){
          // console.log(result);
          assert.strictEqual(0, result);
          done();
        });
      }
    });
  });

});

describe('Data.removeData', function (){

  it('should remove data and return 1 if it exists', function (done){

    var itemToInser = {"value": "test", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        // console.log(data);
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);

        Data.removeData("test", {"_id": data._id}, function (result){
          assert.strictEqual(1, result);

          Data.findData("test", {"_id": data._id}, function (err, foundData){
            if(err){
              done(err);
            }
            else{
              assert.strictEqual(null, foundData);
              done();
            }
          });
        });
      }
    });
  });

  it('should return 0 if data do not exists', function (done){
    Data.removeData("test", {"_id": 0}, function (result){
      assert.strictEqual(0, result);
      done();
    });
  });

});
