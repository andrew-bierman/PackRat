import { X } from '@tamagui/lucide-icons'
import { useId, useState } from 'react'
import { Button, Image, Label, ScrollView, View, XStack } from 'tamagui'

import { useFilePicker } from './hooks/useFilePicker'
import { MediaTypeOptions } from './types'

interface ImagePickerProps {
  onChange: (images: string[]) => void;
}

export function BImagePicker({onChange}: ImagePickerProps) {
  const id = useId()
  const [images, setImages] = useState<string[]>([])
  const { open, getInputProps, getRootProps, dragStatus } = useFilePicker({
    typeOfPicker: 'image',
    mediaTypes: [MediaTypeOptions.Images],
    multiple: true,

    onPick: ({ webFiles, nativeFiles }) => {
      if (webFiles?.length) {
        const pickedImages = webFiles?.map((file) => URL.createObjectURL(file))
        setImages((images) => {
          const result = [...images, ...pickedImages]
          onChange(pickedImages)

          return result
        })
      } else if (nativeFiles?.length) {
        setImages((images) => {
          const pickedImages = nativeFiles?.map?.((file) => file.base64).filter((base64) => !!base64) || []
          const result =  [...images, ...nativeFiles.map((file) => file.uri)]
          onChange(pickedImages)

          return result
        })
      }
    },
  })

  const { isDragActive } = dragStatus

  return (
    // @ts-ignore reason: getRootProps() which is web specific return some react-native incompatible props, but it's fine
    <View
      flexDirection="column"
      {...getRootProps()}
      bs="dashed"
      maxWidth={600}
      width="100%"
      minHeight={200}
      justifyContent="center"
      alignItems="center"
      borderWidth={isDragActive ? 2 : 1}
      borderColor={isDragActive ? '$gray11' : '$gray9'}
      gap="$2"
      borderRadius="$true"
    >
      {/* need an empty input div just have image drop feature in the web */}
      {/* @ts-ignore */}
      <View id={id} tag="input" width={0} height={0} {...getInputProps()} />
      <View>
        <Button size="$3" onPress={open}>
          Pick Images
        </Button>

        <View width="100%" alignItems="center" justifyContent="center">
          <Label
            display={images.length ? 'none' : 'flex'}
            $platform-native={{
              display: 'none',
            }}
            size="$3"
            htmlFor={id}
            color="$color9"
            t="$1"
            pos="absolute"
            whiteSpace="nowrap"
          >
            Drag images into this area
          </Label>
        </View>
      </View>

      <ScrollView
        display={images.length ? 'flex' : 'none'}
        flexDirection="row"
        borderRightWidth={1}
        borderLeftWidth={1}
        borderColor="$gray4Light"
        width="100%"
        themeInverse
        paddingBottom="$0"
        horizontal
        overflow="auto"
        flexWrap="nowrap"
      >
        <XStack gap="$4" flexWrap="nowrap" px="$4" pt={10}>
          {images?.map((image, i) => (
            <View flexDirection="column" key={image}>
              <Image
                borderRadius={10}
                key={image}
                width={100}
                height={100}
                source={{ uri: image }}
              />
              <Button
                onPress={() => {
                  setImages(images.filter((_, index) => index !== i))
                }}
                right={0}
                y={-6}
                x={6}
                size="$1"
                circular
                position="absolute"
              >
                <X size={12} />
              </Button>
            </View>
          ))}
        </XStack>
      </ScrollView>
    </View>
  )
}
