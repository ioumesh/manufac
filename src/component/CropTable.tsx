import React from "react";
import { cropData } from "../dataset/cropdata";
import { Table } from "@mantine/core";

const CropTable: React.FC = () => {
  // Helper function to filter crops by year and find max/min production
  const getMaxMinCrops = (year: string) => {
    const filteredCrops = cropData.filter((crop) => crop.Year === year);
    let maxCrop = filteredCrops[0];
    let minCrop = filteredCrops[0];

    filteredCrops.forEach((crop) => {
      if (
        crop.CropProduction !== 0 &&
        crop.CropProduction > maxCrop.CropProduction
      ) {
        maxCrop = crop;
      }
      if (
        crop.CropProduction !== 0 &&
        crop.CropProduction < minCrop.CropProduction
      ) {
        minCrop = crop;
      }
    });

    return { maxCrop, minCrop };
  };

  // Function to render the table rows based on year
  const renderTableRows = () => {
    const uniqueYears = Array.from(new Set(cropData.map((item) => item.Year)));

    return uniqueYears.map((year) => {
      const { maxCrop, minCrop } = getMaxMinCrops(year);
      return (
        <Table.Tr key={year}>
          <Table.Td>{year}</Table.Td>
          <Table.Td>
            {maxCrop.CropName} ({maxCrop.CropProduction} tonnes)
          </Table.Td>
          <Table.Td>
            {minCrop.CropName} ({minCrop.CropProduction} tonnes)
          </Table.Td>
        </Table.Tr>
      );
    });
  };

  return (
    <div>
      <h2 className="crop-heading">Crop Production</h2>
      <Table className="table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderTableRows()}</Table.Tbody>
      </Table>
    </div>
  );
};

export default CropTable;
