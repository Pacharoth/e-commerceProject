import axios from 'axios';
import {localhost} from '../utils/FormValidation';
const insertPayPalCustomer = async(datas)=>{
  console.log(datas);
    const script = document.createElement('script');
    script.src="https://www.paypal.com/sdk/js?client-id=AUpA2RxAkbTSapEIHP7lHT9uiU3TWBCkvCmnI38sqWUsGEitxZwov1eRPYAXcKECuAzjS-luKQH4JymS";
    script.addEventListener("load",function(){
        window.paypal
        .Buttons({
          style:{
            size:"responsive",
            color:"gold",
            label:"checkout",
            shape:"rect",
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
            console.log(datas.product.value,order);

            const response=await axios.post(localhost+'/receipt',datas.product.value);
            if(response.data.err){
              console.log(response.data.err);
            }else{
              datas.router.push({name:'receipt',params:{id:response.data._id}})
            }
          }
        }).render(datas.paypal.value);
    })
    document.body.appendChild(script);
}
const insertPayPalSeller = async(paypal)=>{
  console.log(paypal.value)
  
}
export{insertPayPalCustomer,insertPayPalSeller}