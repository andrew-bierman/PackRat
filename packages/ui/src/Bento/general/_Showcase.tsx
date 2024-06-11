import { Code, Eye, Info, Link, Minus, Plus } from '@tamagui/lucide-icons';
import React, { useRef, useState } from 'react';
import type { SizeTokens } from 'tamagui';
import { useToastController } from '@tamagui/toast';

import {
  YGroup,
  Button,
  H2,
  ScrollView,
  SizableText,
  Stack,
  ThemeableStack,
  XGroup,
  XStack,
  YStack,
  createStyledContext,
  useEvent,
  useIsomorphicLayoutEffect,
  Spinner,
  Text,
  useMedia,
  View,
} from 'tamagui';
import useSWR from 'swr';
import { useRouter } from '@packrat/crosspath';
import { isZodNumber } from '@ts-react/form/lib/src/isZodTypeEqual';
import { Hide } from '../forms/layouts/components/layoutParts';

export const Showcase = YStack.styleable<{
  children: React.ReactNode;
  title: string;
  fileName: string;
  short?: boolean;
  isInput?: boolean;
}>(({ children, title, short, isInput, fileName, ...rest }, ref) => {
  const [view, setView] = useState<'code' | 'preview'>('preview');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const toast = useToastController();

  const media = useMedia();

  const query = {
    section: false,
    part: false,
  };

  const codePath =
    query.section &&
    query.part &&
    `/api/bento/code/${query.section}/${query.part}/${fileName}`;

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const error = new Error(
        'An error occurred while fetching the data.',
      ) as any;
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.text();
  };

  const { data, error, isLoading } = useSWR<string>(
    view === 'code' ? codePath : null, // Only fetch when view is set to 'code'
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );

  const iDontHaveAccess =
    error?.status === 403 || error?.status === 401 || error?.status === 500;

  const minHeight = short ? 300 : 510;
  const deviceWidth = 500; //width

  return (
    <SizeProvider>
      <YStack
        zIndex={phoneFocused ? 10000 : 1}
        gap="$3"
        my="$-2"
        ref={ref}
        {...rest}
      >
        <XStack als="flex-end" justifyContent="space-between" gap="$3">
          <Button
            //@ts-ignore
            title="copy link"
            id={fileName}
            circular
            chromeless
            size="$3"
            onPress={() => {
              navigator.clipboard.writeText(
                window.location.href.split('#')[0] + `#${fileName}`,
              );
              toast.show('Link copied to clipboard');
            }}
          >
            <Button.Icon>
              <Link />
            </Button.Icon>
          </Button>
          <XGroup borderRadius="$10">
            <Button
              icon={Eye}
              theme={view === 'preview' ? 'active' : null}
              size="$3"
              onPress={() => setView('preview')}
            >
              {media.gtMd && (
                <Button.Text display="none" $gtXs={{ display: 'block' }}>
                  Preview
                </Button.Text>
              )}
            </Button>
            <Button
              icon={Code}
              theme={view === 'code' ? 'active' : null}
              size="$3"
              onPress={() => setView('code')}
            >
              {media.gtMd && (
                <Button.Text display="none" $gtXs={{ display: 'block' }}>
                  Code
                </Button.Text>
              )}
            </Button>
          </XGroup>
        </XStack>

        {view === 'preview' ? (
          <XStack mih={minHeight} minWidth="100%" position="relative">
            <H2
              themeInverse
              size="$7"
              paddingHorizontal="$2"
              paddingVertical="$1"
              color="$color"
              rotate="-1deg"
              transformOrigin="left"
              backgroundColor="$background"
              y="$-8"
              zi={100}
              pos="absolute"
              t="$0"
              l="$2"
              fow="300"
            >
              {title}
            </H2>

            <XStack
              width="calc(100% - 290px)"
              $md={{
                width: '100%',
              }}
            >
              <ResizableBox>
                <XStack
                  backgroundColor="$background"
                  className="blur-8"
                  borderRadius="$8"
                  borderWidth={0.5}
                  borderColor="$color3"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  minHeight={minHeight}
                  overflow="hidden"
                >
                  <YStack
                    height="100%"
                    width="100%"
                    maxWidth={isInput ? 300 : '100%'}
                  >
                    {children}
                  </YStack>
                </XStack>
                <SizeController
                  position="absolute"
                  right={10}
                  top={0}
                  bottom={0}
                />
              </ResizableBox>
            </XStack>
            <YStack
              animation="quick"
              pe="none"
              position="absolute"
              top={-30}
              right={-115}
              bottom={0}
              width={deviceWidth}
              paddingLeft={100}
              paddingRight={100}
              x={0}
              $md={{
                display: 'none',
              }}
              overflow="hidden"
            >
              <PhoneFrame setPhoneFocused={setPhoneFocused}>
                {children}
              </PhoneFrame>
            </YStack>
          </XStack>
        ) : isLoading ? (
          <MessagesFrame title={title} minHeight={minHeight} hideDragHandle>
            <Spinner color="$color" size="large" />
          </MessagesFrame>
        ) : iDontHaveAccess ? (
          <MessagesFrame title={title} minHeight={minHeight} hideDragHandle>
            <Text
              textAlign="center"
              color="$green10"
              $group-window-sm={{ fontSize: '$2' }}
            >
              Purchase the Bento package to access the code.
            </Text>
          </MessagesFrame>
        ) : data ? (
          <></>
        ) : (
          <MessagesFrame title={title} minHeight={minHeight}>
            <Text
              textAlign="center"
              color="$green10"
              $group-window-sm={{ fontSize: '$2' }}
            >
              Purchase the Bento package to access the code.
            </Text>
          </MessagesFrame>
          // <MessagesFrame title={title} minHeight={minHeight}>
          //   <Text
          //     textAlign="center"
          //     color="$gray10"
          //     $group-window-sm={{ fontSize: '$2' }}
          //   >
          //     Something went wrong
          //   </Text>
          // </MessagesFrame>
        )}
      </YStack>
    </SizeProvider>
  );
});

const MessagesFrame = (props: {
  title: string;
  minHeight: number;
  hideDragHandle?: boolean;
  children: React.ReactNode;
}) => {
  const { title, minHeight, children } = props;
  return (
    <XStack mih={minHeight} width="100%" position="relative">
      <H2
        themeInverse
        size="$7"
        paddingHorizontal="$2"
        paddingVertical="$1"
        color="$color"
        rotate="-1deg"
        transformOrigin="left"
        backgroundColor="$background"
        y="$-8"
        zi={100}
        pos="absolute"
        t="$0"
        l="$2"
        fow="300"
      >
        {title}
      </H2>

      <XStack
        minWidth="100%"
        $md={{
          width: '100%',
        }}
      >
        <ResizableBox hideDragHandle={props.hideDragHandle}>
          <XStack
            backgroundColor="$background"
            className="blur-8"
            borderRadius="$8"
            borderWidth={0.5}
            borderColor="$color3"
            justifyContent="center"
            alignItems="center"
            width="100%"
            minHeight={minHeight}
            overflow="hidden"
          >
            <YStack height="100%" width="100%">
              {children}
            </YStack>
          </XStack>
        </ResizableBox>
      </XStack>
    </XStack>
  );
};

const PHONE_SCALE = 0.75;

const PhoneFrame = (props: any) => {
  const query = useRouter().query;

  return (
    <YStack
      group="window"
      focusable
      className="ms300 all ease-out"
      borderRadius={43}
      height={600}
      width={292}
      backgroundColor="$color1"
      overflow="hidden"
      position="absolute"
      right={100}
      scale={0.9}
      top={0}
      zIndex={0}
      pe="auto"
      hoverStyle={{
        scale: 0.91,
        elevation: '$7',
      }}
      focusStyle={{
        scale: 1.2,
      }}
      onPress={() => {
        if (!props.phoneFocused) {
          props.setPhoneFocused(true);
        }
      }}
      onBlur={() => {
        props.setPhoneFocused(false);
      }}
    >
      <YStack fullscreen>
        <PhoneSVG />
      </YStack>
      <YStack
        paddingBottom={20}
        paddingTop={50}
        paddingHorizontal="$6"
        overflow="hidden"
        width="133.3335%"
        height={800}
        scale={PHONE_SCALE}
        transformOrigin="left top"
      >
        <PhoneScaleProvider scale={0.53}>
          <YStack
            width="100%"
            height="100%"
            borderRadius="$8"
            overflow="hidden"
          >
            {props.children}
          </YStack>
        </PhoneScaleProvider>
      </YStack>
    </YStack>
  );
};

export const { Provider: PhoneScaleProvider, useStyledContext: usePhoneScale } =
  createStyledContext({
    scale: 1,
    invertScale: 1.464,
  });

export const ShowcaseChildWrapper = ScrollView.styleable((props, ref) => {
  const { sm } = useMedia();

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{
        paddingVertical: sm ? 0 : 24,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      paddingHorizontal={sm ? 5 : 24}
      width="100%"
      {...props}
    />
  );
});

// export const ShowcaseChildWrapper = ScrollView.styleable((props, ref) => {
//   return (
//     <ScrollView
//       ref={ref}
//       contentContainerStyle={{
//         paddingVertical: 24,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//       }}
//       paddingHorizontal={16}
//       width="100%"
//       {...props}
//     />
//   )
// })

type ResizableBoxExtraProps = {
  hideDragHandle?: boolean;
};
const ResizableBox = XStack.styleable<ResizableBoxExtraProps>(
  ({ children, hideDragHandle, ...rest }, ref) => {
    const [width, setWidth] = useState<number | string>('100%');
    const startX = useRef(null);
    const initialWidth = useRef<number>();
    const containerRef = useRef<HTMLDivElement>();

    useIsomorphicLayoutEffect(() => {
      initialWidth.current = containerRef.current?.getBoundingClientRect()
        .width as number;
    }, [containerRef.current]);

    const handleMouseMove = useEvent((e) => {
      if (startX.current !== null) {
        let finalWidth = width;
        if (typeof finalWidth === 'string') {
          finalWidth = containerRef.current?.getBoundingClientRect()
            .width as number;
          initialWidth.current = finalWidth;
        }
        if (finalWidth) {
          const newWidth = finalWidth + e.clientX - startX.current;
          if (newWidth > initialWidth.current! + 10) {
            handleMouseUp();
            return;
          }
          setWidth(Math.min(Math.max(newWidth, 320), initialWidth.current!));
          startX.current = e.clientX;
        }
      }
    });

    const handleMouseUp = useEvent(() => {
      startX.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    });

    const handleDragStart = useEvent((e) => {
      startX.current = e.clientX;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });

    return (
      <XStack
        flex={1}
        ref={ref}
        alignItems="stretch"
        userSelect="none"
        gap="$2"
        {...rest}
      >
        <XStack
          alignItems="center"
          group="window"
          ref={containerRef as any}
          width={width as any}
        >
          {children}
          <YStack
            display={hideDragHandle ? 'none' : 'flex'}
            marginRight={-16}
            width={20}
            cursor="col-resize"
            onMouseDown={handleDragStart}
            height="100%"
            alignItems="center"
            justifyContent="center"
            group
          >
            <Stack
              maxHeight="50%"
              // height="$16"
              width={8}
              backgroundColor="$background05"
              hoverStyle={{
                backgroundColor: '$background075',
              }}
              pressStyle={{
                backgroundColor: '$background075',
              }}
              alignSelf="center"
              borderRadius={1000_000}
              themeInverse
            />
            <View
              $group-hover={{ height: '$4' }}
              width={8}
              left={-2}
              height="$3"
              backgroundColor="$background05"
              borderRadius="$5"
            />
          </YStack>
        </XStack>
      </XStack>
    );
  },
);

export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <ThemeableStack
      position="absolute"
      bottom={12}
      left={12}
      bordered
      backgrounded
      theme="orange"
      padding="$2"
      paddingHorizontal="$3"
      gap="$3"
      zIndex={100000}
      radiused
      themeInverse
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Info color="$color" size={18} />
      <SizableText size="$4">{children}</SizableText>
    </ThemeableStack>
  );
}

export default ResizableBox;

/** ---------- SIZE CONTROLLER ----------- */

export const { Provider: RawSizeProvider, useStyledContext: useSize } =
  createStyledContext({
    sizes: [] as SizeTokens[],
    setSizes: (sizes: SizeTokens[]) => {},
    size: '$true' as SizeTokens,
    setSize: (size: SizeTokens) => {},
    showController: false,
    setShowController: (val: boolean) => {},
  });

const SizeProvider = ({ children }: { children: any }) => {
  const [sizes, setSizes] = useState<SizeTokens[]>([
    '$3',
    '$4',
    '$5',
    '$6',
    '$7',
  ]);
  const [size, setSize] = useState<SizeTokens>('$3');
  const [showController, setShowController] = useState(false);
  return (
    <RawSizeProvider
      sizes={sizes}
      setSizes={setSizes}
      showController={showController}
      setShowController={setShowController}
      size={size}
      setSize={setSize}
    >
      {children}
    </RawSizeProvider>
  );
};

export const WithSize = ({ children }: { children: any }) => {
  const { size, showController, setShowController } = useSize();

  if (!showController) {
    setShowController(true);
  }

  return React.cloneElement(children, { size });
};

export const SizeController = YGroup.styleable((props, ref) => {
  const { size, sizes, setSize, showController } = useSize();
  if (!showController) return null;
  return (
    <YGroup
      ref={ref}
      justifyContent="center"
      alignItems="center"
      right={0}
      bottom={0}
      gap="$1"
      {...props}
    >
      <YGroup.Item>
        <Button
          size="$3"
          chromeless
          py="$6"
          onPress={() => {
            const index = sizes.indexOf(size);
            setSize(sizes[index + 1 >= sizes.length ? 4 : index + 1]);
          }}
        >
          <Button.Icon>
            <Plus />
          </Button.Icon>
        </Button>
      </YGroup.Item>
      <YGroup.Item>
        <Button
          size="$3"
          chromeless
          py="$6"
          onPress={() => {
            const index = sizes.indexOf(size);
            setSize(sizes[index - 1 < 0 ? 0 : index - 1]);
          }}
        >
          <Button.Icon>
            <Minus />
          </Button.Icon>
        </Button>
      </YGroup.Item>
    </YGroup>
  );
});

const PhoneSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 715 1467">
    <path
      d="M0 166.4C0 108.155 0 79.0318 11.3353 56.785C21.3062 37.2161 37.2161 21.3062 56.785 11.3353C79.0318 0 108.155 0 166.4 0H548.6C606.845 0 635.968 0 658.215 11.3353C677.784 21.3062 693.694 37.2161 703.665 56.785C715 79.0318 715 108.155 715 166.4V1300.6C715 1358.85 715 1387.97 703.665 1410.21C693.694 1429.78 677.784 1445.69 658.215 1455.66C635.968 1467 606.845 1467 548.6 1467H166.4C108.155 1467 79.0318 1467 56.785 1455.66C37.2161 1445.69 21.3062 1429.78 11.3353 1410.21C0 1387.97 0 1358.85 0 1300.6V166.4Z"
      fill="var(--color2)"
      style={{
        outline: `0 0 10px #000`,
      }}
    />
    <mask
      id="mask0_2_131"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="35"
      y="36"
      width="645"
      height="1395"
    >
      <path
        d="M42.4116 73.1286C35 87.6746 35 106.716 35 144.8V1322.2C35 1360.28 35 1379.33 42.4116 1393.87C48.9309 1406.67 59.3336 1417.07 72.1286 1423.59C86.6746 1431 105.716 1431 143.8 1431H571.2C609.284 1431 628.325 1431 642.871 1423.59C655.666 1417.07 666.069 1406.67 672.588 1393.87C680 1379.33 680 1360.28 680 1322.2V144.8C680 106.716 680 87.6746 672.588 73.1286C666.069 60.3336 655.666 49.9309 642.871 43.4116C628.325 36 609.284 36 571.2 36H537.778C536.122 36 535.295 36 534.632 36.2412C533.521 36.6456 532.646 37.5209 532.241 38.6319C532 39.2947 532 40.1224 532 41.7778C532 55.0209 532 61.6425 530.07 66.9446C526.835 75.8332 519.833 82.835 510.945 86.0702C505.642 88 499.021 88 485.778 88H229.222C215.979 88 209.358 88 204.055 86.0702C195.167 82.835 188.165 75.8332 184.93 66.9446C183 61.6425 183 55.0209 183 41.7778C183 40.1224 183 39.2947 182.759 38.6319C182.354 37.5209 181.479 36.6456 180.368 36.2412C179.705 36 178.878 36 177.222 36H143.8C105.716 36 86.6746 36 72.1286 43.4116C59.3336 49.9309 48.9309 60.3336 42.4116 73.1286Z"
        fill="var(--color)"
      />
    </mask>
    <g mask="url(#mask0_2_131)">
      <path d="M25 22H702V1489H25V22Z" fill="var(--background)" />
    </g>
    <path
      d="M319 55C319 51.134 322.134 48 326 48H390C393.866 48 397 51.134 397 55C397 58.866 393.866 62 390 62H326C322.134 62 319 58.866 319 55Z"
      fill="var(--color6)"
    />
    <path
      d="M413 55C413 47.268 419.268 41 427 41C434.732 41 441 47.268 441 55C441 62.732 434.732 69 427 69C419.268 69 413 62.732 413 55Z"
      fill="var(--color6)"
    />
    <defs>
      <clipPath id="clip0_2_131">
        <rect
          width="133.664"
          height="124.999"
          fill="var(--color)"
          transform="translate(297.536 709.493)"
        />
      </clipPath>
    </defs>
  </svg>
);
