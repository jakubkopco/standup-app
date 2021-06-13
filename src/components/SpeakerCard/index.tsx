import { useState } from 'react';

import {
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useStopwatch } from 'react-timer-hook';

import { Speaker } from '@/app/standup/standup.types';
import { ConfirmMenuItem, MenuItem } from '@/components';

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, index }) => {
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const [isSpeaked, setIsSpeaked] = useState(false);

  const controlStopWatch = () => {
    if (isRunning) {
      pause();
      setIsSpeaked(true);
    } else {
      start();
    }
  };

  const resetStopwatch = () => {
    reset();
    setIsSpeaked(false);
    pause();
  };

  return (
    <Draggable draggableId={`draggable-${speaker?.name}`} index={index}>
      {(provided) => (
        <Stack
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          direction="row"
          spacing={3}
          alignItems="center"
          bg="gray.600"
          p={2}
          borderRadius="md"
        >
          <Checkbox
            colorScheme="blackAlpha"
            isIndeterminate={isRunning}
            isChecked={isSpeaked}
          />
          <Stack
            onClick={controlStopWatch}
            direction="row"
            spacing={3}
            cursor="pointer"
          >
            <Text fontWeight="medium">{speaker?.name}</Text>
            <Text w={45}>
              {minutes?.toString()?.length === 1 ? `0${minutes}` : minutes}:
              {seconds?.toString()?.length === 1 ? `0${seconds}` : seconds}
            </Text>
          </Stack>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BsThreeDotsVertical />}
              variant="@primary"
              size="xs"
            />
            <MenuList color="gray.700" bg="gray.200">
              <MenuItem
                _hover={{ bg: 'gray.300' }}
                _focus={{ bg: 'gray.400' }}
                onClick={() => resetStopwatch()}
              >
                Réinitialiser
              </MenuItem>
              <ConfirmMenuItem
                _hover={{ bg: 'gray.300' }}
                _focus={{ bg: 'gray.400' }}
                confirmContent="Confirmer la suppression"
              >
                Supprimer
              </ConfirmMenuItem>
            </MenuList>
          </Menu>
        </Stack>
      )}
    </Draggable>
  );
};
