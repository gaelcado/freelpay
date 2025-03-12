"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextIcon } from "@radix-ui/react-icons"
import {
  DisplayXL,
  DisplayLG,
  DisplayMD,
  DisplaySM,
  HeadingXL,
  HeadingLG,
  HeadingMD,
  HeadingSM,
  HeadingXS,
  BodyLG,
  BodyMD,
  BodySM,
  BodyXS,
  Label,
  Stat,
  CardTitle as TypographyCardTitle,
  Badge,
  ButtonText,
  NavText,
  ResponsiveHeadingXL,
  ResponsiveHeadingLG,
  ResponsiveHeadingMD,
  ResponsiveHeadingSM,
  ResponsiveBodyLG,
  ResponsiveBodyMD,
  ResponsiveBodySM,
  TruncatedText,
  Typography
} from "@/components/ui/typography"

export function TypographyShowcase() {
  return (
    <Tabs defaultValue="standard" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        <TabsTrigger value="standard">Standard</TabsTrigger>
        <TabsTrigger value="responsive">Responsive</TabsTrigger>
        <TabsTrigger value="utilities">Utilities</TabsTrigger>
        <TabsTrigger value="special">Special</TabsTrigger>
      </TabsList>

      <TabsContent value="standard" className="mt-6 space-y-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TextIcon className="h-5 w-5 text-primary" />
              <CardTitle>Standard Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Display Typography</h3>
                <div className="space-y-4">
                  <div className="p-2 border-l-4 border-primary">
                    <DisplayXL>Display XL</DisplayXL>
                    <BodyXS className="text-muted-foreground mt-1">text-5xl font-semibold tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <DisplayLG>Display LG</DisplayLG>
                    <BodyXS className="text-muted-foreground mt-1">text-4xl font-semibold tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <DisplayMD>Display MD</DisplayMD>
                    <BodyXS className="text-muted-foreground mt-1">text-3xl font-semibold tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <DisplaySM>Display SM</DisplaySM>
                    <BodyXS className="text-muted-foreground mt-1">text-2xl font-semibold tracking-tight</BodyXS>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Heading Typography</h3>
                <div className="space-y-4">
                  <div className="p-2 border-l-4 border-primary">
                    <HeadingXL>Heading XL</HeadingXL>
                    <BodyXS className="text-muted-foreground mt-1">text-3xl font-medium tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <HeadingLG>Heading LG</HeadingLG>
                    <BodyXS className="text-muted-foreground mt-1">text-2xl font-medium tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <HeadingMD>Heading MD</HeadingMD>
                    <BodyXS className="text-muted-foreground mt-1">text-xl font-medium tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <HeadingSM>Heading SM</HeadingSM>
                    <BodyXS className="text-muted-foreground mt-1">text-lg font-medium tracking-tight</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <HeadingXS>Heading XS</HeadingXS>
                    <BodyXS className="text-muted-foreground mt-1">text-base font-medium tracking-tight</BodyXS>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Body Typography</h3>
                <div className="space-y-4">
                  <div className="p-2 border-l-4 border-primary">
                    <BodyLG>Body LG: The quick brown fox jumps over the lazy dog</BodyLG>
                    <BodyXS className="text-muted-foreground mt-1">text-lg leading-7</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <BodyMD>Body MD: The quick brown fox jumps over the lazy dog</BodyMD>
                    <BodyXS className="text-muted-foreground mt-1">text-base leading-6</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <BodySM>Body SM: The quick brown fox jumps over the lazy dog</BodySM>
                    <BodyXS className="text-muted-foreground mt-1">text-sm leading-5</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <BodyXS>Body XS: The quick brown fox jumps over the lazy dog</BodyXS>
                    <BodyXS className="text-muted-foreground mt-1">text-xs leading-4</BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="responsive" className="mt-6 space-y-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TextIcon className="h-5 w-5 text-primary" />
              <CardTitle>Responsive Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Responsive Headings</h3>
                <BodySM className="mb-4">Resize your browser to see how these headings adapt to different screen sizes.</BodySM>
                <div className="space-y-4">
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveHeadingXL>Responsive Heading XL</ResponsiveHeadingXL>
                    <BodyXS className="text-muted-foreground mt-1">text-2xl md:text-3xl lg:text-4xl</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveHeadingLG>Responsive Heading LG</ResponsiveHeadingLG>
                    <BodyXS className="text-muted-foreground mt-1">text-xl md:text-2xl lg:text-3xl</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveHeadingMD>Responsive Heading MD</ResponsiveHeadingMD>
                    <BodyXS className="text-muted-foreground mt-1">text-lg md:text-xl lg:text-2xl</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveHeadingSM>Responsive Heading SM</ResponsiveHeadingSM>
                    <BodyXS className="text-muted-foreground mt-1">text-base md:text-lg lg:text-xl</BodyXS>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Responsive Body Text</h3>
                <BodySM className="mb-4">Resize your browser to see how these text sizes adapt to different screen sizes.</BodySM>
                <div className="space-y-4">
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveBodyLG>Responsive Body LG: The quick brown fox jumps over the lazy dog</ResponsiveBodyLG>
                    <BodyXS className="text-muted-foreground mt-1">text-base md:text-lg leading-7</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveBodyMD>Responsive Body MD: The quick brown fox jumps over the lazy dog</ResponsiveBodyMD>
                    <BodyXS className="text-muted-foreground mt-1">text-sm md:text-base leading-6</BodyXS>
                  </div>
                  <div className="p-2 border-l-4 border-primary">
                    <ResponsiveBodySM>Responsive Body SM: The quick brown fox jumps over the lazy dog</ResponsiveBodySM>
                    <BodyXS className="text-muted-foreground mt-1">text-xs md:text-sm leading-5</BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="utilities" className="mt-6 space-y-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TextIcon className="h-5 w-5 text-primary" />
              <CardTitle>Typography Utilities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Text Truncation</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md max-w-md">
                    <h4 className="text-sm font-medium mb-2">Single Line Truncation</h4>
                    <TruncatedText variant="body-md" lines={1}>
                      This is a very long text that will be truncated after a single line. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </TruncatedText>
                  </div>
                  <div className="p-4 border rounded-md max-w-md">
                    <h4 className="text-sm font-medium mb-2">Two Lines Truncation</h4>
                    <TruncatedText variant="body-md" lines={2}>
                      This is a very long text that will be truncated after two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </TruncatedText>
                  </div>
                  <div className="p-4 border rounded-md max-w-md">
                    <h4 className="text-sm font-medium mb-2">Three Lines Truncation</h4>
                    <TruncatedText variant="body-md" lines={3}>
                      This is a very long text that will be truncated after three lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </TruncatedText>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Text Alignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Left Aligned</h4>
                    <Typography variant="body-md" align="left">
                      This text is aligned to the left. This is the default alignment for most text content in Western languages.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Center Aligned</h4>
                    <Typography variant="body-md" align="center">
                      This text is centered. Center alignment is often used for headings, quotes, or other special content.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Right Aligned</h4>
                    <Typography variant="body-md" align="right">
                      This text is aligned to the right. Right alignment is sometimes used for numbers in tables or RTL languages.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Justified</h4>
                    <Typography variant="body-md" align="justify">
                      This text is justified. Justified text aligns to both the left and right margins, creating a clean edge on both sides. It&apos;s often used in print but can be harder to read on screens.
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Text Transformation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Uppercase</h4>
                    <Typography variant="body-md" transform="uppercase">
                      This text is transformed to uppercase.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Lowercase</h4>
                    <Typography variant="body-md" transform="lowercase">
                      THIS TEXT IS TRANSFORMED TO LOWERCASE.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Capitalize</h4>
                    <Typography variant="body-md" transform="capitalize">
                      this text has each word capitalized.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Normal Case</h4>
                    <Typography variant="body-md" transform="normalCase">
                      This text preserves its original case.
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Font Weight</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Light</h4>
                    <Typography variant="body-md" weight="light">
                      This text has a light font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Normal</h4>
                    <Typography variant="body-md" weight="normal">
                      This text has a normal font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Medium</h4>
                    <Typography variant="body-md" weight="medium">
                      This text has a medium font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Semibold</h4>
                    <Typography variant="body-md" weight="semibold">
                      This text has a semibold font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Bold</h4>
                    <Typography variant="body-md" weight="bold">
                      This text has a bold font weight.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="special" className="mt-6 space-y-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TextIcon className="h-5 w-5 text-primary" />
              <CardTitle>Special Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">UI-Specific Typography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Stat</h4>
                    <div className="flex items-center gap-2">
                      <Stat>$12,345</Stat>
                      <span className="text-xs text-muted-foreground">text-2xl font-bold tracking-tight</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Card Title</h4>
                    <div className="flex items-center gap-2">
                      <TypographyCardTitle>Recent Activity</TypographyCardTitle>
                      <span className="text-xs text-muted-foreground">text-sm font-medium</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Badge</h4>
                    <div className="flex items-center gap-2">
                      <Badge>New</Badge>
                      <span className="text-xs text-muted-foreground">text-xs font-medium</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Button Text</h4>
                    <div className="flex items-center gap-2">
                      <ButtonText>Submit</ButtonText>
                      <span className="text-xs text-muted-foreground">text-sm font-medium</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-medium mb-2">Nav Text</h4>
                    <div className="flex items-center gap-2">
                      <NavText>Dashboard</NavText>
                      <span className="text-xs text-muted-foreground">text-sm font-medium</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Label Component</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <Label size="lg" htmlFor="input-lg">Large Label</Label>
                    <BodyXS className="text-muted-foreground mt-1">text-base font-medium</BodyXS>
                  </div>
                  <div className="p-4 border rounded-md">
                    <Label size="md" htmlFor="input-md">Medium Label</Label>
                    <BodyXS className="text-muted-foreground mt-1">text-sm font-medium</BodyXS>
                  </div>
                  <div className="p-4 border rounded-md">
                    <Label size="sm" htmlFor="input-sm">Small Label</Label>
                    <BodyXS className="text-muted-foreground mt-1">text-xs font-medium</BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 