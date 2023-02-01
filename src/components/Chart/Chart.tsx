import React from "react";
import "./Chart.css";
import {YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,} from "recharts";
import postsRequest from "../../api/posts";
import { useQuery } from "react-query";

const LineRechartComponent = () => {
  
  const {data:posts} = useQuery("posts", postsRequest.get); 
  function groupBy<T, P extends keyof T>(objectArray: T[], property: P) {
    type Response = (Pick<T, P> & {count:number})[];
    return objectArray.reduce((acc: (T & {count: number})[], obj) => {
      const index = acc.findIndex(
        (owner) => owner[property] === obj[property]
      );
      if (index === -1) {
        acc.push({ [property]: obj[property], count: 1 } as T & {count: number});
      } else {
        acc[index] = { ...acc[index], count: acc[index].count + 1 };
      }
      return acc;
    }, []) as Response;
  }

  const postsUser = posts ? groupBy(posts, "author") : [];

  //console.log(postsUser[0]);

  return (
    <ResponsiveContainer width="45%" height={500} className="recharts-wrapper">
      <AreaChart
        width={700}
        height={400}
        data={postsUser}
        margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="author" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default LineRechartComponent;
