const order = require("../models/orderModel");
const payment = require("../models/paymentModel");
const user = require("../models/userModel");
const {Types} = require('mongoose')
const ObjectId =Types.ObjectId;
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
                    hour:{$hour:"$registerAt"},
                    minute:{$minute:"$registerAt"},
                    second:{$second:"$registerAt"},
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
    res.json({result:result,sellers:sellers.length,status:"yearly"});
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
                    hour:{$hour:"$registerAt"},
                    minute:{$minute:"$registerAt"},
                    second:{$second:"$registerAt"},
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
    res.json({result:result,sellers:sellers.length,status:"monthly"});
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
                    hour:{$hour:"$registerAt"},
                    minute:{$minute:"$registerAt"},
                    second:{$second:"$registerAt"},
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
    res.json({result:result,sellers:sellers.length,satus:"daily"});
}
exports.getYearlySeller = async(req,res)=>{
    // 60b8b86fc0df5344c1b028e7
    console.log(req.params.id)
    var result= await order.aggregate([
        {
            $project:{
                "users":0,
                
            },
            
        },
        {
            $match:{
                "product.sellers":ObjectId(req.params.id),
            }
        },
        // {
        //     $group:{
        //         _id:"$product"
        //     }
        // },
        // {$unwind:"$_id"},
        {$unwind:"$product"},  
        {
            $match:{
                "product.sellers":ObjectId(req.params.id)
            }
        },
        {
            $lookup:{
                from:"sellers",
                localField:"product.sellers",
                foreignField:"_id",
                as:"product.sellers"
            }
        },
        {
            $lookup:{
                from:"products",
                localField:"product.products",
                foreignField:"_id",
                as:"product.products"
            }
        },
        {$unwind:"$product.products"},
        {$unwind:"$product.sellers"},
        {
            $group:{
                _id:{
                    year:{
                        $year:"$orderDate",
                    },
                    month:{
                        $month:"$orderDate",
                    },
                    order:"$product",
                    status:"$status"
                },
                totalProfit:{
                    $sum:{
                        $multiply:[{$subtract:["$product.products.price","$product.products.buyPrice"]},"$product.quantity"]
                    }
                },
                totalPayment:{
                    $sum:"$product.products.buyPrice"
                },
                totalEarning:{
                    $sum:{
                        $multiply:["$product.products.price","$product.quantity"]
                    }

                },
                totalSaleUnit:{
                    $sum:"$product.quantity"
                }
            }
        },
        {
            $group:{
                _id:{
                    year:"$_id.year",
                    month:"$_id.month",

                },
                totalEarning:{
                    $sum:"$totalEarning"
                },
                totalPayment:{
                    $sum:"$totalPayment",
                },
                totalProfit:{
                    $sum:"$totalProfit"
                },
                totalSaleUnit:{
                    $sum:"$totalSaleUnit"
                }
            }
        },
        {
            $match:{
                "_id.year":new Date().getFullYear(),
            }
        }
        // {$unwind:"$products"},
        
    ])
    res.json(result)
}
exports.getMonthlySeller = async(req,res)=>{
    // 60b8b86fc0df5344c1b028e7
    console.log(req.params.id)
    var result= await order.aggregate([
            {
                $project:{
                    "users":0,
                    
                },
                
            },
            {
                $match:{
                    "product.sellers":ObjectId(req.params.id),
                }
            },
            // {
            //     $group:{
            //         _id:"$product"
            //     }
            // },
            // {$unwind:"$_id"},
            {$unwind:"$product"},  
            {
                $match:{
                    "product.sellers":ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from:"sellers",
                    localField:"product.sellers",
                    foreignField:"_id",
                    as:"product.sellers"
                }
            },
            {
                $lookup:{
                    from:"products",
                    localField:"product.products",
                    foreignField:"_id",
                    as:"product.products"
                }
            },
            {$unwind:"$product.products"},
            {$unwind:"$product.sellers"},
            {
                $group:{
                    _id:{
                        year:{
                            $year:"$orderDate",
                        },
                        month:{
                            $month:"$orderDate",
                        },
                        day:{
                            $dayOfMonth:"$orderDate",
                        },
                        order:"$product",
                        status:"$status"
                    },
                    totalProfit:{
                        $sum:{
                            $multiply:[{$subtract:["$product.products.price","$product.products.buyPrice"]},"$product.quantity"]
                        }
                    },
                    totalPayment:{
                        $sum:"$product.products.buyPrice"
                    },
                    totalEarning:{
                        $sum:{
                            $multiply:["$product.products.price","$product.quantity"]
                        }
    
                    },
                    totalSaleUnit:{
                        $sum:"$product.quantity"
                    }
                }
            },
            {
                $group:{
                    _id:{
                        year:"$_id.year",
                        month:"$_id.month",
                        day:"$_id.day"
                    },
                    totalEarning:{
                        $sum:"$totalEarning"
                    },
                    totalPayment:{
                        $sum:"$totalPayment",
                    },
                    totalProfit:{
                        $sum:"$totalProfit"
                    },
                    totalSaleUnit:{
                        $sum:"$totalSaleUnit"
                    }
                }
            },
            {
                $match:{
                    "_id.year":new Date().getFullYear(),
                    "_id.month": new Date().getMonth()+1,
                }
            }
            // {$unwind:"$products"},
            
        ])
    res.json(result)
}
exports.getDailySeller = async(req,res)=>{
    // 60b8b86fc0df5344c1b028e7
    console.log(req.params.id)
    var result= await order.aggregate([
            {
                $project:{
                    "users":0,
                    
                },
                
            },
            {
                $match:{
                    "product.sellers":ObjectId(req.params.id),
                }
            },
            {$unwind:"$product"},  
            {
                $match:{
                    "product.sellers":ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from:"sellers",
                    localField:"product.sellers",
                    foreignField:"_id",
                    as:"product.sellers"
                }
            },
            {
                $lookup:{
                    from:"products",
                    localField:"product.products",
                    foreignField:"_id",
                    as:"product.products"
                }
            },
            {$unwind:"$product.products"},
            {$unwind:"$product.sellers"},
            {
                $group:{
                    _id:{
                        year:{
                            $year:"$orderDate",
                        },
                        month:{
                            $month:"$orderDate",
                        },
                        day:{
                            $dayOfMonth:"$orderDate",
                        },
                        hour:{
                            $hour:"$orderDate"
                        },
                        minute:{
                            $minute:"$orderDate",
                        },
                        order:"$product",
                        status:"$status"
                    },
                    totalProfit:{
                        $sum:{
                            $multiply:[{$subtract:["$product.products.price","$product.products.buyPrice"]},"$product.quantity"]
                        }
                    },
                    totalPayment:{
                        $sum:"$product.products.buyPrice"
                    },
                    totalEarning:{
                        $sum:{
                            $multiply:["$product.products.price","$product.quantity"]
                        }
    
                    },
                    totalSaleUnit:{
                        $sum:"$product.quantity"
                    }
                }
            },
            {
                $group:{
                    _id:{
                        year:"$_id.year",
                        month:"$_id.month",
                        day:"$_id.day",
                        hour:"$_id.hour",
                        minute:"$_id.minute"
                    },
                    totalEarning:{
                        $sum:"$totalEarning"
                    },
                    totalPayment:{
                        $sum:"$totalPayment",
                    },
                    totalProfit:{
                        $sum:"$totalProfit"
                    },
                    totalSaleUnit:{
                        $sum:"$totalSaleUnit"
                    }
                }
            },
            {
                $match:{
                    "_id.year":new Date().getFullYear(),
                    "_id.month": new Date().getMonth()+1,
                    "_id.day": new Date().getDate(),
                }
            }
            // {$unwind:"$products"},
            
        ])
    res.json(result)
}