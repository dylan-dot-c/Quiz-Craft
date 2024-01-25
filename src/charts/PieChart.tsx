import { Bar, Pie } from "react-chartjs-2";
import datasets from "./datasets";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

function PieChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );
    return (
        <div className='w-50'>
            <Pie
                data={{
                    labels: datasets.map((year) => year.year),
                    datasets: [
                        {
                            label: "Users Gained",
                            data: datasets.map((data) => data.gained),
                            borderColor: "white",
                            backgroundColor: "#123",
                            borderWidth: 3,
                        },
                        {
                            label: "Users Lost",
                            data: datasets.map((data) => data.lost),
                            borderColor: "#123",
                            backgroundColor: "#321",
                            borderWidth: 1,
                        },
                        {
                            label: "Changed",
                            data: datasets.map(
                                (data) => data.gained - data.lost
                            ),
                            borderColor: "#204853",
                            backgroundColor: [
                                "#321112",
                                "#123456",
                                "#123",
                                "yellow",
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
                options={options}
            />
        </div>
    );
}

export default PieChart;
