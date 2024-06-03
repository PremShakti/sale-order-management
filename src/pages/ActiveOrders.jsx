import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveOrders } from "../api";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const ActiveOrders = ({ openModal }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["activeOrders"],
    queryFn: fetchActiveOrders,
  });

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading active orders</Box>;
  console.log("data hai", data);
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Customer</Th>
          <Th>Price</Th>
          <Th>Last Modified Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((order) => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.name || "Unknown"}</Td>
            <Td>{order.price}</Td>
            <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
            <Td>
              <Button onClick={() => openModal(order)}>Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ActiveOrders;
