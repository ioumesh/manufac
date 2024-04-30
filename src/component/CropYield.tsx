import React from "react";
import { cropData } from "../dataset/cropdata";
import { Table } from "@mantine/core";

// Define the structure for the aggregated data
interface AggregatedData {
  CropName: string;
  AverageYield: number;
  AverageArea: number;
}

const CropYield: React.FC = () => {
  // Helper function to process data
  const processData = (): AggregatedData[] => {
    const dataMap: {
      [key: string]: { totalYield: number; totalArea: number; count: number };
    } = {};

    cropData.forEach((data) => {
      if (!dataMap[data.CropName]) {
        dataMap[data.CropName] = { totalYield: 0, totalArea: 0, count: 0 };
      }
      dataMap[data.CropName].totalYield += data.YieldOfCrops;
      dataMap[data.CropName].totalArea += data.AreaUnderCultivation;
      dataMap[data.CropName].count++;
    });

    const result: AggregatedData[] = Object.keys(dataMap).map((key) => ({
      CropName: key,
      AverageYield: dataMap[key].totalYield / dataMap[key].count,
      AverageArea: dataMap[key].totalArea / dataMap[key].count,
    }));

    return result;
  };

  const aggregatedData = processData();

  // Function to render the table rows based on year
  const renderTableRows = () => {
    return aggregatedData.map((data) => {
      return (
        <Table.Tr key={data.CropName}>
          <Table.Td>{data.CropName}</Table.Td>
          <Table.Td>{data.AverageYield.toFixed(3)}</Table.Td>
          <Table.Td>{data.AverageArea.toFixed(3)}</Table.Td>
        </Table.Tr>
      );
    });
  };

  return (
    <div>
      <h2>Average Yield</h2>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderTableRows()}</Table.Tbody>
      </Table>
    </div>
  );
};

export default CropYield;
