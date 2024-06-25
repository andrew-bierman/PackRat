import { useRef } from 'react';
import type { SizeTokens } from 'tamagui';
import { View } from 'tamagui';
import { Input } from './inputsParts';
import { TextInput } from 'react-native';
import { useForwardFocus } from './useForwardFocus';

/**
 * note: make sure to use the same width for the input and the container
 */

export function InputWithIcon({ LeftIcon, RightIcon, size, value, onChange, placeholder }: { size?: SizeTokens, placeholder?: string, value: string, onChange: (text: string) => void, RightIcon, LeftIcon }) {
    const inputRef = useRef<TextInput>(null);
    const focusTrigger = useForwardFocus(inputRef);
    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    return (
        <View justifyContent="center" alignItems="center">
            <Input size={size} minWidth="100%">
                <Input.Box>
                    <Input.Icon {...focusTrigger}>
                        {LeftIcon}
                    </Input.Icon>
                    <Input.Area
                        onChangeText={(t) => {
                            onChange(t);
                        }}
                        value={value}
                        ref={inputRef}
                        paddingEnd={0}
                        placeholder={placeholder}
                    />
                    {value && (
                        <Input.Icon onPress={handleClear}>
                            {RightIcon}
                        </Input.Icon>
                    )}
                </Input.Box>
            </Input>
        </View>
    );
}

InputWithIcon.fileName = 'InputWithIcon';