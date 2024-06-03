
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCompletedOrders } from '../api';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';

const CompletedOrders = ({ openModal }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['completedOrders'],
    queryFn: fetchCompletedOrders
  });

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading completed orders</Box>;

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
        {data.map(order => (
          <Tr key={order.id}>
          <Td>{order.id}</Td>
          <Td>{order.customer_profile?.name || "Unknown"}</Td>
          <Td>{order.items.length}</Td>
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

export default CompletedOrders;
