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

        Data.updateData("test", {"_id": data._id}, {"value": itemUpdateValue},
         function (err, result){
          if(err){
            done(err);
          }
          else{
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
          }
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

        Data.updateData("test", {"_id": 0}, {"value": itemUpdateValue}, function (err, result){
          if(err){
            done(err);
          }
          else{
            // console.log(result);
            assert.strictEqual(0, result);
            done();
          }
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

        Data.removeData("test", {"_id": data._id}, function (err, result){
          if(err){
            done(err);
          }
          else{
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
          }
        });
      }
    });
  });

  it('should return 0 if data do not exists', function (done){
    Data.removeData("test", {"_id": 0}, function (err, result){
      if(err){
        done(err);
      }
      else{
        assert.strictEqual(0, result);
        done();
      }
    });
  });

});

describe('Data.findAllData', function (){

  it('should find all specified objects without error', function (done){

    var itemToInser = {"value": "test", "class": "first", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);
        assert.strictEqual(itemToInser.class, data.class);

        var itemToInser2 = {"value": "test2", "class": "first", "trash": false};

        Data.insertData("test", itemToInser2, function (err, data2){
          if(err){
            done(err);
          }
          else{
            assert.notStrictEqual(null, data2._id);
            assert.strictEqual(itemToInser2.value, data2.value);
            assert.strictEqual(itemToInser2.class, data2.class);

            Data.findAllData("test", {"class": "first"}, function (err, items){
              if(err){
                done(err);
              }
              else{
                assert.strictEqual(2, items.length);
                
                items.sort(function (a, b){ 
                  if (a.value < b.value){ return -1; } 
                  else if(a.value === b.value){ return 0; }
                  else{ return 1; }
                });

                assert.strictEqual(items[0]._id.toString(), data._id.toString());
                assert.strictEqual(items[0].value, data.value);
                assert.strictEqual(items[0].class, data.class);

                assert.strictEqual(items[1]._id.toString(), data2._id.toString());
                assert.strictEqual(items[1].value, data2.value);
                assert.strictEqual(items[1].class, data2.class);

                console.log(items);

                done();
              }
            });
          }
        });
      }
    });

  });

  it('should not find objects if there is not data matching query', function (done){

    Data.findAllData("test", {"class": "2nd"}, function (err, items){
      if(err){
        done(err);
      }
      else{
        assert.strictEqual(0, items.length);
        done();
      }
    });

  });

});

describe('Data.removeAllData', function (){

  it('should remove all objects matching query without error', function (done){

    var itemToInser = {"value": "test", "class": "3rd", "trash": false};

    Data.insertData("test", itemToInser, function (err, data){
      if(err){
        done(err);
      }
      else{
        assert.notStrictEqual(null, data._id);
        assert.strictEqual(itemToInser.value, data.value);
        assert.strictEqual(itemToInser.class, data.class);

        var itemToInser2 = {"value": "test2", "class": "3rd", "trash": false};

        Data.insertData("test", itemToInser2, function (err, data2){
          if(err){
            done(err);
          }
          else{
            assert.notStrictEqual(null, data2._id);
            assert.strictEqual(itemToInser2.value, data2.value);
            assert.strictEqual(itemToInser2.class, data2.class);

            Data.removeAllData("test", {"class": "3rd"}, function (err, result){
              if(err){
                done(err);
              }
              else{
                assert.strictEqual(2, result);

                Data.findAllData("test", {"class": "3rd"}, function (err, items){
                  if(err){
                    done(err);
                  }
                  else{
                    assert.strictEqual(0, items.length);
                    done();
                  }
                });
              }
            });
          }
        });
      }
    });

  });

  it('should not remove data if there is not data matching query', function (done){

    Data.removeAllData("test", {"class": "4th"}, function (err, result){
      if(err){
        done(err);
      }
      else{
        assert.strictEqual(0, result);
        done();
      }
    });

  });

});
