function seemore(model){
    return async(req,res,next)=>{
        const feedback = parseInt(req.query.feedback);
        const limit = parseInt(req.query.limit);

        const startIndex = (feedback-1)*limit;
        const endIndex =feedback*limit;

        const results={};
        if(endIndex<await model.countDocuments()){
            results.next={
                feedback:feedback+1,
                limit:limit,
            } 
        }
        if(startIndex>0){
            results.previous={
                feedback:feedback-1,
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