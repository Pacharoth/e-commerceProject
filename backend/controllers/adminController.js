const payment = require("../models/paymentModel");
const user = require("../models/userModel");

exports.getYearlyReport = async(req,res)=>{
    var result =await payment.aggregate([
        {
            $lookup:{
                from:"sellers",
                localField:"sellers",
                foreignField:"_id",
                as:"sellers",
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:"$paymentAt"},
                    month:{$month:"$paymentAt"}
                    // type:"$type",
                    // seller:"$sellers",
                    
                },
                
                totalPayment:
                {
                    $sum:{
                        $multiply:["$payment",0.2],
                    }
                },
                totalEarning:{
                    $sum:"$payment"
                },
                
              
            },   
        },
        {
            $addFields:{
                totalProfile:{
                    $subtract:["$totalEarning","$totalPayment"]
                }
            },
        },
        {
            $match:{
                "_id.year":new Date().getFullYear(),
            }
        }
    ]);
    var sellers  =await user.aggregate([
        {
            $lookup:{
                from:'roles',
                localField:"roles",
                foreignField:"_id",
                as:'roles',
            },
        },
        {
            $group:{
                _id:{
                    day:{$dayOfMonth:"$registerAt"},
                    month:{$month:"$registerAt"},
                    year:{$year:"$registerAt"},
                    roles:"$roles",
                }
            }
        },
        {
            $match:{
                "_id.roles.name":"seller",
                "_id.year":new Date().getFullYear(),
            }
        }
    ])
    res.json({result:result,sellers:sellers.length});
}
exports.getMonthlyReport = async(req,res)=>{
    var result =await payment.aggregate([
        {
            $lookup:{
                from:"sellers",
                localField:"sellers",
                foreignField:"_id",
                as:"sellers",
            }
        },
        {
            $group:{
                _id:{
                    month:{$month:"$paymentAt"},
                    year:{$year:"$paymentAt"},
                    day:{$dayOfMonth:"$paymentAt"},
                    // sellers:"$sellers",
                    // type:"$type",
                },
                totalPayment:
                {
                    $sum:{
                        $multiply:["$payment",0.2],
                    }
                },
                totalEarning:{
                    $sum:"$payment"
                },
                
              
            },   
        },
        {
            $addFields:{
                totalProfile:{
                    $subtract:["$totalEarning","$totalPayment"]
                }
            }
        },
        {
            $match:{
                "_id.year":new Date().getFullYear(),
                "_id.month":new Date().getMonth()+1,
            }
        }        
        
    ])
    var sellers  =await user.aggregate([
        {
            $lookup:{
                from:'roles',
                localField:"roles",
                foreignField:"_id",
                as:'roles',
            },
        },
        {
            $group:{
                _id:{
                    day:{$dayOfMonth:"$registerAt"},
                    month:{$month:"$registerAt"},
                    year:{$year:"$registerAt"},
                    roles:"$roles",
                }
            }
        },
        {
            $match:{
                "_id.roles.name":"seller",
                "_id.month":new Date().getMonth()+1,
                "_id.year":new Date().getFullYear(),
            }
        }
    ])
    res.json({result:result,sellers:sellers.length});
}
exports.getDialyReport = async(req,res)=>{
    var result =await payment.aggregate([
        {
            $lookup:{
                from:"sellers",
                localField:"sellers",
                foreignField:"_id",
                as:"sellers",
            }
        },
        {
            $group:{
                _id:{
                    month:{$month:"$paymentAt"},
                    year:{$year:"$paymentAt"},
                    day:{$dayOfMonth:"$paymentAt"},
                    hour:{$hour:"$paymentAt"},
                    minute:{$minute:"$paymentAt"},
                    // type:"$type",
                    // sellers:"$sellers",
                },
                totalPayment:
                {
                    $sum:{
                        $multiply:["$payment",0.2],
                    }
                },
                totalEarning:{
                    $sum:"$payment"
                },
                
              
            },   
        },
        {
            $addFields:{
                totalProfile:{
                    $subtract:["$totalEarning","$totalPayment"]
                }
            }
        },
        {
            $match:{
                "_id.year":new Date().getFullYear(),
                "_id.month":new Date().getMonth()+1,
                "_id.day":new Date().getDate(),
            }
        },
        
    ])
    var sellers  =await user.aggregate([
        {
            $lookup:{
                from:'roles',
                localField:"roles",
                foreignField:"_id",
                as:'roles',
            },
        },
        {
            $group:{
                _id:{
                    day:{$dayOfMonth:"$registerAt"},
                    month:{$month:"$registerAt"},
                    year:{$year:"$registerAt"},
                    roles:"$roles",
                }
            }
        },
        {
            $match:{
                "_id.roles.name":"seller",
                "_id.day":new Date().getDate(),
                "_id.month":new Date().getMonth()+1,
                "_id.year":new Date().getFullYear(),
            }
        }
    ])
    res.json({result:result,sellers:sellers.length});
}