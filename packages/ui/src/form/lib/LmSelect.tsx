import {
  getFontSize,
  Select as OriginalSelect,
  SelectProps,
  ThemeProps,
  YStack as OriginalYStack,
} from 'tamagui';
import { LinearGradient as OriginalLinearGradient } from '@tamagui/linear-gradient';
import {
  CaretDownRegular,
  CaretUpRegular,
  CheckRegular,
  colormap,
  ThemeColors,
} from '../../extras/lib/core/src';
import { useId, useMemo, useState } from 'react';
import { LmFormFieldContainer } from './LmFormFieldContainer';
import { LmFormContainerBaseTypes } from './formContainerTypes';

const YStack: any = OriginalYStack;
const Select: any = OriginalSelect;
const LinearGradient: any = OriginalLinearGradient;

type GetAltThemeNames<S> =
  | (S extends `${string}_${infer Alt}` ? GetAltThemeNames<Alt> : S)
  | S;

export type LmSelectProps = SelectProps &
  LmFormContainerBaseTypes & {
    value?: string;
    options: { label: string; value: string | number }[];
    colorVariant?: ThemeColors;
    themeName?: ThemeProps['name'];
    width?: number | string;
    placeholder?: string;
    dropDownLabel?: string; // above the items list
    fullWidth?: boolean;
    style?: any; // add style prop
  };

export function LmSelect({
  value,
  colorVariant,
  themeName,
  options = [],
  width = 200 as any,
  placeholder = '',
  dropDownLabel,
  required,
  error,
  helperText,
  helperTextProps,
  label,
  labelInline,
  labelProps,
  fullWidth,
  defaultValue,
  onValueChange,
  containerProps,
  style, // add style
  ...rest
}: LmSelectProps) {
  const [selectVal, setSelectVal] = useState<string>(
    value ?? defaultValue ?? '',
  );
  const id = useId();

  const handleChange = (val: string) => {
    setSelectVal(val);
    if (typeof onValueChange === 'function') {
      onValueChange(val);
    }
  };

  const memoizedOptions = useMemo(
    () =>
      options.map((item, i) => (
        <Select.Item index={i} key={item.value} value={`${item.value}`}>
          <Select.ItemText>{item.label}</Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <CheckRegular size={16} />
          </Select.ItemIndicator>
        </Select.Item>
      )),
    [options],
  );

  return (
    <LmFormFieldContainer
      id={id}
      theme={
        colorVariant ? (colormap[colorVariant] as any) : themeName || undefined
      }
      error={error}
      required={required}
      labelProps={labelProps}
      label={label}
      size={rest.size}
      fullWidth={fullWidth}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      {...(containerProps as any)}
    >
      <Select
        id={id}
        disablePreventBodyScroll
        {...rest}
        value={selectVal}
        onValueChange={handleChange}
        style={style} // forward style
      >
        <Select.Trigger
          width={fullWidth ? '100%' : width}
          iconAfter={<CaretDownRegular />}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        {/*@ts-ignore*/}
        <Select.Adapt when="sm">
          <Select.Sheet modal dismissOnSnapToBottom>
            <Select.Sheet.Frame>
              <Select.Sheet.ScrollView>
                <Select.Adapt.Contents />
              </Select.Sheet.ScrollView>
            </Select.Sheet.Frame>
            <Select.Sheet.Overlay />
          </Select.Sheet>
        </Select.Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <CaretUpRegular size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport>
            <Select.Group>
              {dropDownLabel && <Select.Label>{dropDownLabel}</Select.Label>}
              {memoizedOptions}
            </Select.Group>
            {rest.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <CaretDownRegular
                  size={getFontSize((rest.size ?? '$true') as any)}
                />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <CaretDownRegular size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </LmFormFieldContainer>
  );
}
