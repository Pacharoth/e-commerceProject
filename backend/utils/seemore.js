function seemore(model){
    return async(req,res,next)=>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page-1)*limit;
        const endIndex =page*limit;

        const results={};
        if(endIndex<await model.countDocuments()){
            results.next={
                page:page+1,
                limit:limit,
            } 
        }
        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit,
            }
        }
        await model.find().populate('products').limit(limit).skip(startPoint).then(resu=>{
            results.results=resu
            res.pagination =results;
            next()
        }).catch(err=>res.status(500).json(err));
    };
}

module.exports = seemore;