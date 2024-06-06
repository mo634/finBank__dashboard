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
const DoughnutChat = () => {
    // init data for chart 
    const data = {
        labels: ['bank 1', 'bank 2', 'bank 3'],
        datasets: [
            {
                label: '# of Votes',

                data: [1250, 2500, 3750],

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