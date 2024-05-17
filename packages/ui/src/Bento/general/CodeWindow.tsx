// import { Button, H3, Paragraph, Spinner, Theme, XStack } from 'tamagui'
// import dynamic from 'next/dynamic'
// import { useEffect, useMemo, useState } from 'react'
// import { ScrollView, Separator, SizableText, Tabs, YStack } from 'tamagui'
// import { AlertCircle, Copy } from '@tamagui/lucide-icons'
// import { useClipboard } from '../../hooks'
// import useTokenMapper from '../../hooks/useTokenMapper'
// import { useReplaceTokens } from '../../hooks/useReplaceTokens'
// import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker/src/ImagePicker'
// import { useLocalStorage } from 'foxact/use-local-storage'
// interface Props {
//   code: string
//   isLoading?: boolean
// }

// const startOfTheFileRegex = /\/\*\* START of the file (.+\.tsx) \*\//
// export function CodeWindow({ code, isLoading }: Props) {
//   const [CodeBlock, setCodeBlock] = useState<any>(null)

//   const { mappedTokens } = useTokenMapper()

//   const { codeWithReplacedTokens } = useReplaceTokens(code, mappedTokens)

//   useEffect(() => {
//     const CodeBlock = dynamic(() => import('./CodeBlock'))
//     setCodeBlock(CodeBlock)
//   }, [])

//   const tabs = useMemo(() => {
//     const lines = codeWithReplacedTokens.split('\n')

//     let accContent = ''
//     let tabName = ''

//     const accTabs: { name: string; content: string }[] = []
//     lines.forEach((line, index) => {
//       const matchedLine = line.match(startOfTheFileRegex)
//       if (matchedLine) {
//         const fileName = matchedLine[1]
//         if (tabName) {
//           accTabs.push({ name: tabName, content: accContent })
//         }
//         tabName = fileName
//         accContent = ''
//       } else {
//         accContent += line + '\n'
//       }
//     })
//     if (tabName) {
//       accTabs.push({ name: tabName, content: accContent })
//     }
//     return accTabs
//   }, [codeWithReplacedTokens])

//   const [activeTabIndex, setActiveTabIndex] = useState('0')

//   const { hasCopied, onCopy, resetState } = useClipboard(
//     tabs.length ? tabs[Number(activeTabIndex)].content : ''
//   )

//   useEffect(() => {
//     resetState()
//   }, [activeTabIndex])

//   if (!tabs.length || isLoading)
//     return (
//       <XStack
//         height={700}
//         backgroundColor="$background"
//         borderRadius="$6"
//         borderWidth={0.5}
//         borderColor="$borderColor"
//         justifyContent="center"
//         alignItems="center"
//         width="100%"
//         mih={150}
//         overflow="hidden"
//       >
//         <Spinner size="large" />
//       </XStack>
//     )

//   if (tabs.length === 1) {
//     return (
//       <YStack>
//         <Content CodeBlock={CodeBlock} tab={tabs[0]} />
//         <CopyCodeButton onCopy={onCopy} hasCopied={hasCopied} oneTabLayout />
//       </YStack>
//     )
//   }

//   return (
//     <Tabs
//       value={activeTabIndex}
//       onValueChange={setActiveTabIndex}
//       orientation="horizontal"
//       flexDirection="column"
//       backgroundColor="$background"
//       borderRadius="$6"
//       borderWidth={0.5}
//       borderColor="$color3"
//       width="100%"
//       overflow="hidden"
//       padding={0}
//     >
//       <Tabs.List
//         separator={<Separator vertical />}
//         disablePassBorderRadius="bottom"
//         aria-label="Manage your account"
//       >
//         {tabs.map((tab, i) => (
//           <Tabs.Tab
//             bg={String(i) === activeTabIndex ? '$color1' : '$color2'}
//             paddingVertical={25}
//             key={tab.name}
//             flex={1}
//             value={String(i)}
//             hoverStyle={{
//               bg: String(i) === activeTabIndex ? '$color2' : '$color3',
//             }}
//             focusStyle={{
//               bg: String(i) === activeTabIndex ? '$color1' : '$color3',
//             }}
//           >
//             <SizableText
//               color={String(i) === activeTabIndex ? '$gray12' : '$gray10'}
//               size="$3"
//               letterSpacing={1}
//             >
//               {tab.name}
//             </SizableText>
//           </Tabs.Tab>
//         ))}
//       </Tabs.List>
//       {tabs.map((tab, i) => (
//         <Tabs.Content key={tab.name} value={String(i)}>
//           <Content CodeBlock={CodeBlock} tab={tab} />
//         </Tabs.Content>
//       ))}
//       <CopyCodeButton onCopy={onCopy} hasCopied={hasCopied} />
//     </Tabs>
//   )
// }

// function CopyCodeButton({ onCopy, hasCopied, oneTabLayout = false }) {
//   return (
//     <Button
//       borderRadius="$4"
//       themeInverse
//       position="absolute"
//       top={oneTabLayout ? 14 : 64}
//       right={14}
//       size="$4.5"
//       minWidth="11%"
//       maxWidth="11%"
//       onPress={onCopy}
//     >
//       <Button.Text>{hasCopied ? 'Copied' : 'Copy'}</Button.Text>
//       <Button.Icon>
//         <Copy />
//       </Button.Icon>
//     </Button>
//   )
// }

// function CustomizationEnabledBanner() {
//   const [userTamaguiConfig] = useLocalStorage<string | null>('userTamaguiConfig', '')

//   if (!userTamaguiConfig) return null
//   return (
//     <YStack marginTop="$3" marginLeft="$3">
//       <Theme name="green">
//         <XStack minWidth={'87%'} maxWidth={'87%'} br="$4">
//           <YStack o={0.62} bg="$color10" fullscreen br="$4" />
//           <XStack py={14} px="$3" f={1}>
//             <AlertCircle t="$3" l="$3" zi={100} color="$color7" size={22} />
//             <Paragraph
//               ml="$2.5"
//               size="$3"
//               fontWeight="200"
//               lh="$2"
//               color="$color1"
//               marginRight="auto"
//             >
//               Customization enabled
//             </Paragraph>
//             <Paragraph color="$color4" size="$3" lh="$2">
//               These components are customized to your tokens through the customize option.
//             </Paragraph>
//           </XStack>
//         </XStack>
//       </Theme>
//     </YStack>
//   )
// }

// function Content({
//   tab,
//   CodeBlock,
// }: { tab: { name: string; content: string }; CodeBlock: React.ComponentType<any> }) {
//   return (
//     <YStack
//       width="100%"
//       overflow="hidden"
//       padding={0}
//       borderRadius="$6"
//       backgroundColor="$background"
//       tag="pre"
//       mih={500}
//       data-line-numbers={true}
//     >
//       <CustomizationEnabledBanner />
//       <ScrollView
//         showsVerticalScrollIndicator={true}
//         width="100%"
//         maxHeight={700}
//         contentContainerStyle={{
//           padding: 12,
//         }}
//       >
//         {CodeBlock ? (
//           <CodeBlock
//             language="tsx"
//             value={tab.content}
//             backgroundColor="transparent"
//             borderWidth={0}
//             line="0"
//             marginBottom={0}
//           />
//         ) : (
//           <Spinner />
//         )}
//       </ScrollView>
//     </YStack>
//   )
// }
