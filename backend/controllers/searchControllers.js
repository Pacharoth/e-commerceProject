const category = require('../models/categoryModel');
const product = require('../models/productModel');

exports.searchCategory = async(req,res)=>{
	const query = req.query.q.toUpperCase();
	if(query){
		var response = await product.find().populate('categories');
		response= response.filter(element=>findElement(element.name,query)||
									findElement(element.categories.name,query)||
									findElement(element.detail,query	));
	}
	res.json(response);
}
function findElement(element,another_element){
	return element.toUpperCase().indexOf(another_element)!==-1;
}