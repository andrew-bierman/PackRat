import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    Input,
    Text,
    TextArea,
    Label,
    XStack,
    YStack,
} from 'tamagui';
import {
    Button, VStack,
} from 'native-base';
import * as z from 'zod';
import { InputText } from '~/components/InputText';

function RenderInput({ field, fieldProps, control }) {
    const commonProps = {
        ...fieldProps,
        placeholder: field.placeholder,
        disabled: field.isDisabled,
        maxLength: field.maxLength,
        autoCorrect: field.autoCorrect,
        autoCapitalize: field.autoCapitalize,
        autoFocus: field.autoFocus,
        id: field.name,
        label: field.placeholder,
        control,
    };

    switch (field.inputComponent) {
        case 'textarea':
            return <TextArea {...commonProps} rows={field.numberOfLines} />;
        default:
            if (field.inputType === 'password') {
                return <Input {...commonProps} type="password" />;
            }
            return <InputText {...commonProps} />;
    }
}

function RenderError({ error, fieldError }) {
    if (!error && !fieldError) return null;
    return <Text color="danger">{error || fieldError}</Text>;
}

function RenderHelperText({ text }) {
    if (!text) return null;
    return <Text>{text}</Text>;
}

const ReusableForm = forwardRef((props, ref) => {
    const { fields, schema, onSubmit, submitText, stripProperties = [], } = props;

    const includedProperties = Object.keys(schema.shape).filter(
        (property) => !stripProperties.includes(property)
      );
    
      const includedSchema = z.object(
        includedProperties.reduce((acc, property) => {
          acc[property] = schema.shape[property];
          return acc;
        }, {})
      );

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(includedSchema),
    });

    const inputRefs = useRef({});

    const focusInput = (name) => {
        inputRefs.current[name]?.focus();
    };

    useImperativeHandle(ref, () => ({
        focus: focusInput,
    }));


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <XStack
                    overflow="hidden"
                    key={field.name}
                    flexDirection='column'
                >
                    {field.label && <Label htmlFor={field.name}
                        color="gray"
                        fontSize={15}
                        _dark={{
                            color: 'warmGray.200',
                        }} >
                        {field.label}
                    </Label>}
                    <YStack space="$1" >
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: fieldProps }) => (
                                <RenderInput
                                    field={field}
                                    control={control}
                                    fieldProps={{
                                        ...fieldProps,
                                        ref: (el) => (inputRefs.current[field.name] = el),
                                    }}
                                />
                            )}
                        />
                        {errors && errors[field.name] && (
                            <RenderError
                                error={field.errorMessage}
                                fieldError={errors[field.name]?.message}
                            />
                        )}
                        <RenderHelperText text={field.helperText} />
                    </YStack>
                </XStack>
            ))}
            <Form.Trigger asChild>
                <VStack alignItems={'center'}>
                    <Button
                        mt="2"
                        colorScheme={'indigo'}
                        alignContent={'center'}
                        type="submit"
                        onPress={handleSubmit(onSubmit)}
                    >
                        {submitText}
                    </Button>
                </VStack>
            </Form.Trigger>
        </Form>
    );
});

export default ReusableForm;