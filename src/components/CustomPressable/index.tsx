import React from 'react';
import { PressableContainer, PressableButton, Title, Input } from './styles';

type Props = {
  data: string[];
  placeholder: string;
  isTypeSelected: boolean;
  setTypeSelected: React.Dispatch<React.SetStateAction<boolean>>;
  washType: string;
  onSelectType: (item: string) => void;
};

const CustomPressable = ({
  placeholder,
  isTypeSelected,
  data,
  onSelectType,
  setTypeSelected,
  washType,
}: Props) => {
  return (
    <PressableContainer>
      {isTypeSelected ? (
        data.map((item, idx) => {
          return (
            <PressableButton key={idx} onPressIn={() => onSelectType(item)}>
              <Title>{item}</Title>
            </PressableButton>
          );
        })
      ) : (
        <Input
          onPressIn={() => setTypeSelected(true)}
          placeholder={placeholder}
          placeholderTextColor={'rgba(0,0,0,0.4)'}
          value={washType}
        />
      )}
    </PressableContainer>
  );
};

export default CustomPressable;
