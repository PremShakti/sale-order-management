import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import OrderFormModal from "./OrderFormModal";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const openModal = (order) => {
    setEditOrder(order);
    setIsModalOpen(true);
  };

  return (
    <Box p={4}>
      <Button onClick={() => openModal(null)} colorScheme="teal" mb={4}>
        + Sale Order
      </Button>
      <Tabs>
        <TabList>
          <Tab>Active Orders</Tab>
          <Tab>Completed Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrders openModal={openModal} />
          </TabPanel>
          <TabPanel>
            <CompletedOrders openModal={openModal} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isModalOpen && (
        <OrderFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editOrder={editOrder}
        />
      )}
    </Box>
  );
};

export default Orders;
