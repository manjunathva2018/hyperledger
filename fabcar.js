const express = require('express');
var router = express.Router();
const colors = require("colors/safe");
const invoke=require('../invoke');
const query=require('../query');

router
	.route('/create')
            .post(async function(req,res){
                var data = req.body;
                try {
                  let result = await invoke.main('createCar',data);
                  console.log(colors.green(`createFabCar invoke method`), result);
                  res.status(200).json({ success: true, message: 'Transaction has been submitted' });
                } catch (err) {
                  console.log(colors.red(`createFabCar invoke err`), err);
                  res.status(400).json({ success: false,message:'Error occured!', error: err });
                }
            });

router
.route('/updateCarOwner')
        .put(async function(req,res){
            var data = req.body;
            try {
                let result = await invoke.main('changeCarOwner',data);
                console.log(colors.green(`changeCarOwner invoke method`), result);
                res.status(200).json({ success: true, message: 'Transaction has been submitted' });
            } catch (err) {
                console.log(colors.red(`changeCarOwner invoke err`), err);
                res.status(400).json({ success: false,message:'Error occurred !', error: err });
            }
        });

router
	.route('/queryAllCars')
					.get(async function(req,res){
                       
                        try {
                          let result = await query.main('queryAllCars',null);
                          console.log(colors.green(`queryAllCars`), result);
                          res.status(200).json({ success: true,message:'query results', data: result.toString() });
                        } catch (err) {
                          console.log(colors.red(`queryAllCars err`), err);
                          res.status(400).json({ success: false,message:'Error occurred !', error: err });
                        }
                    })

router
.route('/queryCar/:carNumber').get(async function(req,res){
     let carNumber = req.params.carNumber ;
    
    try {
        let result = await query.main('queryCar',carNumber);
        console.log(colors.green(`queryCar`), result);
        res.status(200).json({ success: true,message:'query results', data: result.toString() });
      } catch (err) {
        console.log(colors.red(`queryCar err`), err);
        res.status(400).json({ success: false,message:'Error occurred !', error: err });
      }
})


module.exports = router;