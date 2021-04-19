const linegraph={
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
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
        elements:{
            line:{
            }
        },
        // animations: {
        //     tension: {
        //         duration: 1000,
        //         easing: 'linear',
        //         from: 1,
        //         to: 0,
        //         loop: true
        //     }
        // },
        scales: {
            // y: { 
            //     min: 0,
            //     max: 100
            // }
        },
        responsive:true,
        maintainAspectRatio: true,  
    },

};
export default linegraph;