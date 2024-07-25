import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React,{useEffect,useState} from "react";
import GlobalVariables from "../screens/Doctor/Globel";
const dataaaa = [
  { name: "January", Total: 1200, AnotherTotal: 1000 },
  { name: "February", Total: 2100, AnotherTotal: 1400 },
  { name: "March", Total: 800, AnotherTotal: 700 },
  { name: "April", Total: 1600, AnotherTotal: 1200 },
  { name: "May", Total: 900, AnotherTotal: 500 },
  { name: "June", Total: 1700, AnotherTotal: 1500 },
];

const Chart = ({ aspect, title,data }) => {
  // const [dataaa,setData]=useState([])
  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     const responce=await fetch(`http://192.168.1.110/LernSpace/api/User/GetAllTestResults?pid=7`)
  //     const dataa=await responce.json()
  //     if(dataa!=null){
  //       setData(dataa)
  //       console.log(dataa)
  //     }
  //   }
  //   fetchData()
  // },[])
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
          {/* <Area
            type="monotone"
            dataKey="AnotherTotal"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#anotherTotal)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
