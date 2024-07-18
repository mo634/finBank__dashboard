"use client"
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    plugins,
} from 'chart.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
const DoughnutChat = ({accounts}:any) => {
    const accountName = accounts.map((a:any)=>a.name)
    const balance = accounts.map((a:any)=>a.currentBalance)

    // init data for chart 
    const data = {
        labels: accountName,
        datasets: [
            {
                label: '# of Votes',

                data: balance,

                backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"]


            },
        ],
    };

    //init options 
    const option = {
        cutout: "60%",
        plugins: {
            legend: {
                display: false
            }
        }
    }
    return (
        <div className='w-[120px] h-[120px]'>
            <Doughnut
                data={data}
                options={option}
            />
        </div>
    )
}

export default DoughnutChat