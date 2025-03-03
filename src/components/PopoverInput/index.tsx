import React from 'react';

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { FieldInput } from '@/components/FieldInput';

interface PopoverInputProps extends Omit<PopoverProps, 'onSubmit'> {
  onSubmit(value: string): void;
  label: string;
  submitLabel?: string;
  placeholder?: string;
}

export const PopoverInput: React.FC<PopoverInputProps> = ({
  children,
  onSubmit = () => {},
  label,
  submitLabel = 'Valider',
  placeholder = 'Saisir...',
  ...rest
}) => {
  const internalForm = useForm();

  const handleSubmit = (values) => {
    onSubmit(values?.input);
  };

  const initialFocusRef = React.useRef();

  return (
    <Popover initialFocusRef={initialFocusRef} {...rest}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <Formiz connect={internalForm} autoForm onValidSubmit={handleSubmit}>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton zIndex="10" />
            <>
              <PopoverBody>
                <FieldInput
                  ref={initialFocusRef}
                  name="input"
                  label={label}
                  placeholder={placeholder}
                />
              </PopoverBody>
              <PopoverFooter
                borderColor="transparent"
                d="flex"
                justifyContent="flex-end"
              >
                <Button
                  type="submit"
                  variant="@primary"
                  size="sm"
                  onClick={(e) => e.currentTarget?.blur()}
                >
                  {submitLabel}
                </Button>
              </PopoverFooter>
            </>
          </PopoverContent>
        </Formiz>
      </Portal>
    </Popover>
  );
};
