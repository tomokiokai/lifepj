import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, } from "@chakra-ui/react";
import { FC, memo } from "react";
import { Shop } from "../../../types/api/shop";

type Props = {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ShopDetailModal: FC<Props> = memo((props) => {
  const { shop, isOpen, onClose } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ショップ詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>ショップ名</FormLabel>
              <Input value={shop?.name} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>場所</FormLabel>
              <Input value={shop?.location} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>カテゴリ</FormLabel>
              <Input value={shop?.category} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>説明</FormLabel>
              <Input value={shop?.description} isReadOnly />
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
