const category = require('../models/categoryModel');
const product = require('../models/productModel');

exports.searchCategory = async(req,res)=>{
	const response = await product.find({
			name:new RegExp(req.query.q)
			
		}).populate({
		path:'categories',
		match:{
			name:new ReqExp(req.query.q)
		}
	})

	res.json(response);
}