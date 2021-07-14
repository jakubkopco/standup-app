import { useRef } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { Formiz } from '@formiz/core';

import { GoalForm, GoalFormValues } from './GoalForm';

interface GoalModalProps extends Omit<ModalProps, 'children' | 'isOpen'> {
  onSubmit?(values: GoalFormValues): void;
  initialsValues?: GoalFormValues;
  title?: string;
  confirmText?: string;
}

export const GoalModal: React.FC<GoalModalProps> = ({
  onClose,
  onSubmit = () => {},
  initialsValues,
  title = 'Objectif',
  confirmText = 'Valider',
}) => {
  const initialRef = useRef();

  const handleSubmit = (values) => {
    onSubmit(values);
    onClose();
  };
  return (
    <Modal isOpen={true} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <Formiz
        autoForm
        onValidSubmit={handleSubmit}
        initialValues={initialsValues}
      >
        <ModalContent color="gray.100" bg="gray.600">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GoalForm ref={initialRef} />
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button variant="ghost" color="gray.600" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="@primary" type="submit">
              {confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Formiz>
    </Modal>
  );
};
