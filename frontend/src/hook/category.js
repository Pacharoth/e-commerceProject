import axios from "axios";
const localhost ="http://localhost:3000"
async function deleteACategory(ids,category,err){
    await axios.delete(localhost+'/category/'+ids).then(
        result=>{
            if(result.data.delete){
                console.log(result.data.delete)
                category.value=category.value.filter(element=>element._id!==ids);
            }else{
                err.value="Can't delete";
                setTimeout(()=>{err.value=""},2000)
            }
        }
    ).catch(()=>{
        err.value="Can't delete";
        setTimeout(()=>{err.value=""},2000)
    });
}
function getACategory(ids,category,id,status,name){
    const acategory=category.value.filter(element=>element._id===ids)[0];
    name.value=acategory.name;
    id.value= acategory._id;
    status.value="update"
}
async function updateACategory(ids,name,category,id,status,err){
    await axios.put(localhost+'/category/'+ids,{name:name.value}).then(
        result=>{
            category.value.filter(element=>{
                    if(element._id===ids){
                        element.name = result.data.name
                    }
                }
            )
            id.value="";
            name.value="";
            status.value="search";
        }
    ).catch(()=>err.value="can't update");
}
async function searchCategories(name,category,err){
    await axios.get(localhost+'/category/search?name='+name.value).then(
        result=>{
            console.log(result.data)
            if(result.data.length>0){
                err.value="";
                category.value=result.data;
            }else{
                err.value="No result"
                category.value=""
            }
    }).catch(()=>err.value="No result")
}
async function addACategory(name,category,err){
    await axios.post(localhost+'/category',{name:name.value}).then(
        result=>{
            var response =result.data
            category.value.push({_id:response._id,name:response.name});
            name.value="";
        }
    ).catch(()=>err.value="Can't add category");
}
export{
    deleteACategory,
    getACategory,
    updateACategory,
    searchCategories,
    addACategory,

}