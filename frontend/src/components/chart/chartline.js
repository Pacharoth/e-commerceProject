const linegraph=async(data)=>{
    console.log(data)
    return{
        type: 'line',
        data: {
            labels:data.label,
            datasets: [{
                label: 'Profit',
                data:data.profit,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            {
                label: 'Earning',
                data: data.earning,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            {
                label: 'Payment',
                data: data.payment,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            ]
        },
        canvas:{
            parentNode:{
                style:{
                    height:'30vh',
                    width:'80vh'
                }
            }
        },
        options: {
            layout:{Padding:0},
        
            responsive:true,
            maintainAspectRatio: false,  
        },
    
    };
}

export default linegraph;