import { File } from '@tamagui/lucide-icons';
import { Upload } from '@tamagui/lucide-icons';
import { useId, useState } from 'react';
import { Button, Label, Text, View } from 'tamagui';

// import { useFilePicker } from './hooks/useFilePicker';
import { MediaTypeOptions } from './types';
import { useFilePicker } from '../../../hooks/user/useFilePicker';
import Avatar from '../../Avatar/Avatar';

/** ------ EXAMPLE ------ */
export function UploadFile() {
  const id = useId();
  const [file, setFile] = useState<File>();
  const { open, getInputProps, getRootProps, dragStatus } = useFilePicker({
    typeOfPicker: 'file',
    mediaTypes: [MediaTypeOptions.All],
    multiple: false, // Added as per requirement
    onPick: ({ webFiles, nativeFiles }) => {
      if (webFiles?.length) {
        setFile(webFiles[0]);
      } else if (nativeFiles?.length) {
        setFile(nativeFiles[0] as any);
      }
    },
  });

  const { isDragActive } = dragStatus;

  return (
    // @ts-ignore reason: getRootProps() which is web specific return some react-native incompatible props, but it's fine
    <View
      flexDirection="column"
      {...getRootProps()}
      bs="dashed"
      width={400}
      maxWidth="100%"
      height={250}
      justifyContent="center"
      alignItems="center"
      borderWidth={isDragActive ? 2 : 1}
      borderColor={isDragActive ? '$gray11' : '$gray9'}
      gap="$6"
      padding="$4"
      borderRadius="$3"
    >
      <View flexDirection="column" gap="$3">
        <View>
          <Avatar src={file} />
          <Button onPress={open} size="$3">
            <Button.Icon>
              <Upload y={-1} />
            </Button.Icon>
            <Button.Text size="$2">Update Profile Picture</Button.Text>
          </Button>
          {/* {!file && (
            <View
              width="100%"
              alignItems="center"
              justifyContent="center"
              $platform-native={{
                display: 'none',
              }}
            >
              <Label
                t="$1"
                pos="absolute"
                size="$3"
                htmlFor={id}
                color="$color9"
                whiteSpace="nowrap"
              >
                Drag a file into this area
              </Label>
            </View>
          )} */}
          {/* @ts-ignore */}
          <View id={id} tag="input" width={0} height={0} {...getInputProps()} />

          {file && (
            <View
              width="100%"
              alignItems="center"
              justifyContent="center"
              t="$4.5"
            >
              <View
                flexDirection="row"
                theme="alt1"
                gap="$2"
                ai={'center'}
                pos="absolute"
              >
                <View flexShrink={0}>
                  <File color="$color" size={'$1'} />
                </View>
                <Text
                  t="$1"
                  ellipsizeMode="head"
                  fontSize={'$3'}
                  whiteSpace="nowrap"
                >
                  {file.name}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {/* need an empty input div just have image drop feature in the web */}
      {/*  @ts-ignore */}
    </View>
  );
}

UploadFile.fileName = 'UploadFile';
