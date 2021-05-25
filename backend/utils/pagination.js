function pagination(model){
    return async(req,res,next)=>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startPoint = (page-1)*limit;
        const endPoint =page*limit;
        const results={};
        if(endPoint<await model.countDocuments()){
            results.next={
                page:page+1,
                limit:limit,
            } 
        }
        if(startPoint>0){
            results.previous={
                page:page-1,
                limit:limit,
            }
        }
        console.log(endPoint);
        await model.find().populate('users').limit(limit).skip(startPoint).then(resu=>{
            results.results=resu
            res.pagination =results;
            next()
        }).catch(err=>res.status(500).json(err));
    };
}

module.exports = pagination;