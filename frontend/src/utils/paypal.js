import axios from 'axios';
import {localhost} from '../utils/FormValidation';
const insertPayPalCustomer = async(datas)=>{
  console.log(datas);
    const script = document.createElement('script');
    script.src="https://www.paypal.com/sdk/js?client-id=Abuh5N_FhP2Q6Px2PdKCevpTg-uaNYYj3Bc7n9eUro4CtNnbLxzJLnvG_WYvV8zOv9xsSz5yI8_tmKDo";
    script.addEventListener("load",function(){
        window.paypal
        .Buttons({
          style:{
            size:"responsive",
            color:"gold",
            label:datas.type,
            shape:"rect",
            layout:"horizontal",
            fundingicons: 'true',
          },
          funding:{
            disallowed: [ window.paypal.FUNDING.CREDIT ]
          },
          createOrder:(data,actions)=>{
            console.log(data);
            return actions.order.create({
              purchase_units:[
                {
                  // datas,
                  amount:{
                    currency_code:"USD",
                    value:datas.total.value,
                  }
                }
              ]
            })
          },
          onApprove:async(data,actions)=>{
            const order = await actions.order.capture();
            console.log(order,data);

            if(Array.isArray(datas.product.value)){
              const response=await axios.post(localhost+'/receipt',datas.product.value);
              if(response.data.err){
                console.log(response.data.err);
              }else{
                datas.router.push({name:'receipt',params:{id:response.data._id}})
              }
            }else{
              const response = await axios.post(localhost+"/buynow",datas.product.value);
              if(response.data.err){
                console.log(response.data.err)
              }else{
                datas.router.push({name:'receipt',params:{id:response.data._id}});
              }
            }
          },
          onError:err=>{
            console.log(err);
          }
        }).render(datas.paypal.value);
    })
    document.body.appendChild(script);
}
const insertPayPalSeller = async(datas)=>{
  console.log(datas);
  const script = document.createElement('script');
  script.src="https://www.paypal.com/sdk/js?client-id=Abuh5N_FhP2Q6Px2PdKCevpTg-uaNYYj3Bc7n9eUro4CtNnbLxzJLnvG_WYvV8zOv9xsSz5yI8_tmKDo";
  script.addEventListener("load",function(){
      window.paypal
      .Buttons({
        style:{
          size:"responsive",
          color:"gold",
          label:datas.type,
          shape:"rect",
          fundingicons: 'true',
        },
        
        createOrder:(data,actions)=>{
          console.log(data);
          return actions.order.create({
            purchase_units:[
              {
                // datas,
                amount:{
                  currency_code:"USD",
                  value:datas.total.value,
                }
              }
            ]
          })
        },
        onApprove:async(data,actions)=>{
          const order = await actions.order.capture();
          console.log(order,data);  
          console.log(datas.seller);
          let response=await axios.post(localhost+'/paymentseller',{
            sellers:datas.seller._id,
            type:datas.typepayment,
            payment:datas.total.value,
          },{
            headers:{
              "content-type":"application/json"
            }
          }
          )
          if(response.data.save){
            alert(datas.seller.company+" has been purchased as "+datas.typepayment);
            datas.modal.value.hide();
            datas.router.push({path:'/'});
            return true;
          }else{
            alert(datas.seller.company +' cannot make the purchase '+datas.typepayment);
            return false;
          }
        },
        onError:err=>{
          console.log(err);
        }
      }).render(datas.paypal.value);
  })
  document.body.appendChild(script);
  
}
export{
  insertPayPalCustomer,
  insertPayPalSeller,
}