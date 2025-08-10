// import { TableClient } from "@azure/data-tables";

// const tableName = process.env.REACT_APP_TABLE_NAME;
// const tableEndpoint = process.env.REACT_APP_TABLE_ENDPOINT;
// const sasToken = process.env.REACT_APP_SAS_TOKEN;

// const client = new TableClient(`${tableEndpoint}/${tableName}${sasToken}`);

// export const getWeatherData = async () => {
//   const data = [];
//   const entities = client.listEntities();

//   for await (const entity of entities) {
//     data.push(entity);
//   }

//   data.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
//   return data;
// };


export const getWeatherData = async () => {
  const res = await fetch("http://localhost:5000/api/weather");
  const data = await res.json();
  return data;
};
