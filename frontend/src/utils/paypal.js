const insertPayPal = async(paypal)=>{
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
        }).render(paypal.value);
    })
    document.body.appendChild(script);
}
export{insertPayPal}