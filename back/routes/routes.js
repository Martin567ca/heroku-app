const express = require('express');
const router = express.Router();
const lookupTemp = require('../models/lookupModels');
const mongo = require('mongodb');
var url = 'mongodb+srv://Martin:finki21@cluster0.bzvbz.mongodb.net/macedonia?retryWrites=true&w=majority';

// This is where our api requests are handled

// We have a request path with POST method (and an experimenal post route for saving data to DB 
// - > used to test the DB at start of project, might have use in the future)
// -> you can open the test.http file in the /back area of the project, edit the location to /api/lookup and test this out
// Our post method handles requests made to the base URL + /api/lookupget path 
// and this is where the response is determined (retrieving the data from DB)
router.post('/lookupget',function(request,response,next){
    try{
        mongo.connect(url,function(err,db){       
            var lookupItem = request.body.buildingType;
            var query1 = {amenity:lookupItem};
            var query2 = {building:lookupItem};
            var query3 = {leisure:lookupItem};
            var myPromise1 = ()=>{
                return new Promise((resolve,reject)=>{
                    var searchA = db.db('macedonia').collection('Amenities').find(query1).toArray(function(err,result){
                        if(result.length==0){
                            result=("Nothing found in amenities");
                         }
                         err 
                           ? reject(err) 
                           : resolve(result);                                
                    });
                })
            }
            var myPromise2 = ()=>{
                return new Promise((resolve,reject)=>{
                    var searchB = db.db('macedonia').collection('Buildings').find(query2).toArray(function(err,result){
                        if(result.length==0){
                            result=("Nothing found in buildings");
                         }
                         err 
                           ? reject(err) 
                           : resolve(result);
                    });;
                })
            }
            var myPromise3 = ()=>{
                return new Promise((resolve,reject)=>{
                    var searchC = db.db('macedonia').collection('Leisures').find(query3).toArray(function(err,result){
                        
                        if(result.length==0){
                           result=("Nothing found in leisures");
                        }
                        err 
                          ? reject(err) 
                          : resolve(result);
                    });;
                })
            }
            var callPromises = async()=>{
                var result1 = await(myPromise1());
                var result2 = await(myPromise2());
                var result3 = await(myPromise3());
                var resultArray = [];
                if(result1!="Nothing found in amenities"){
                    for(var i=0;i<result1.length;i++){
                        if(result1[i].name!=""){
                            resultArray.push(result1[i]);
                        }
                        
                    }
                }
                if(result2!="Nothing found in buildings"){
                    for(var i=0;i<result2.length;i++){
                        if(result2[i].name!=""){
                            resultArray.push(result2[i]);
                        }
                    }
                }
                if(result3!="Nothing found in leisures"){
                    for(var i=0;i<result3.length;i++){
                        if(result3[i].name!=''){
                            resultArray.push(result3[i]);
                        }
                    }
                }
                return(resultArray);
            }
            callPromises().then(res=>{
                db.close();
                response.json(res);

            })
            
        })
    }catch(e){
        next(e)
    }
    
   
    
    
})
router.post('/lookup',(request,response)=>{
    const lookupCopy = new lookupTemp({
        buildingType:request.body.buildingType,
        locationX:request.body.locationX,
        locationY:request.body.locationY
    })
    lookupCopy.save()
    .then(data=>{

        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})

module.exports = router