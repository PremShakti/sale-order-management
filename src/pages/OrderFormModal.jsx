import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveOrder } from "../api";

const OrderFormModal = ({ isOpen, onClose, editOrder }) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveOrder,
    onSuccess: () => {
      queryClient.invalidateQueries("activeOrders");
      onClose();
    },
  });

  useEffect(() => {
    if (editOrder) {
      reset(editOrder);
    } else {
      reset({
        customer_id: "",
        items: [],
        paid: false,
        invoice_no: "",
        invoice_date: new Date(),
        price: 0,
        name: "",
      });
    }
  }, [editOrder, reset]);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editOrder ? "Edit Order" : "Add Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Customer Name</FormLabel>
              <Input
                type="text"
                {...register("name", { required: "Customer Name is required" })}
              />
            </FormControl>
            <FormControl isInvalid={errors.price}>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                {...register("price", { required: "Priceis required" })}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" mt={4}>
              {editOrder ? "Update" : "Create"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderFormModal;
