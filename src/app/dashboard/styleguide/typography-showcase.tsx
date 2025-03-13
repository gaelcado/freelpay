"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextIcon } from "@radix-ui/react-icons";
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
  Typography,
} from "@/components/ui/typography";
export function TypographyShowcase() {
  return (
    <Tabs defaultValue="standard" className="w-full" data-oid=".2-svbh">
      <TabsList
        className="grid grid-cols-2 md:grid-cols-4 w-full"
        data-oid="w084l2."
      >
        <TabsTrigger value="standard" data-oid="q_y8xj6">
          Standard
        </TabsTrigger>
        <TabsTrigger value="responsive" data-oid="1a1j5p3">
          Responsive
        </TabsTrigger>
        <TabsTrigger value="utilities" data-oid="yrz95x_">
          Utilities
        </TabsTrigger>
        <TabsTrigger value="special" data-oid="3.cg_z2">
          Special
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="standard"
        className="mt-6 space-y-6"
        data-oid="zw:x:u3"
      >
        <Card variant="default" elevation="medium" data-oid="_07ui:6">
          <CardHeader data-oid="k45qdl.">
            <div className="flex items-center gap-2" data-oid="bf2judi">
              <TextIcon className="h-5 w-5 text-primary" data-oid="c4p8yvn" />
              <CardTitle data-oid="u-9x8u.">Standard Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent data-oid="vjvg7v3">
            <div className="space-y-8" data-oid="x1.p8qs">
              <div data-oid="xi9054_">
                <h3 className="text-xl font-medium mb-4" data-oid="jmhn80l">
                  Display Typography
                </h3>
                <div className="space-y-4" data-oid="beypx-c">
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="20gmxk5"
                  >
                    <DisplayXL data-oid="4inwpyb">Display XL</DisplayXL>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="3intxgg"
                    >
                      text-5xl font-semibold tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="86u1gks"
                  >
                    <DisplayLG data-oid="c0tzc2z">Display LG</DisplayLG>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="6xagbo8"
                    >
                      text-4xl font-semibold tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="fm43f4k"
                  >
                    <DisplayMD data-oid="rph8kbt">Display MD</DisplayMD>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="5d94c:."
                    >
                      text-3xl font-semibold tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="kw3m2qv"
                  >
                    <DisplaySM data-oid="gy0fec5">Display SM</DisplaySM>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="e3sc_3r"
                    >
                      text-2xl font-semibold tracking-tight
                    </BodyXS>
                  </div>
                </div>
              </div>

              <div data-oid="vrisofs">
                <h3 className="text-xl font-medium mb-4" data-oid="d1k5ejp">
                  Heading Typography
                </h3>
                <div className="space-y-4" data-oid="u:5lqn8">
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="1pty96e"
                  >
                    <HeadingXL data-oid="1psjkx.">Heading XL</HeadingXL>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="fay9n-l"
                    >
                      text-3xl font-medium tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=".ww7198"
                  >
                    <HeadingLG data-oid="kd7pzjq">Heading LG</HeadingLG>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="j25_8_e"
                    >
                      text-2xl font-medium tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="9_26jed"
                  >
                    <HeadingMD data-oid="7k_kb7n">Heading MD</HeadingMD>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="w7au1zc"
                    >
                      text-xl font-medium tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=":9lte3b"
                  >
                    <HeadingSM data-oid="ja9p-l0">Heading SM</HeadingSM>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="zkv-g69"
                    >
                      text-lg font-medium tracking-tight
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="i5pt4pe"
                  >
                    <HeadingXS data-oid="r8wz:5j">Heading XS</HeadingXS>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="18sulrs"
                    >
                      text-base font-medium tracking-tight
                    </BodyXS>
                  </div>
                </div>
              </div>

              <div data-oid="_3t51ui">
                <h3 className="text-xl font-medium mb-4" data-oid="1dslu.l">
                  Body Typography
                </h3>
                <div className="space-y-4" data-oid="swy1e6e">
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="rhx9wdv"
                  >
                    <BodyLG data-oid="wg4l:9_">
                      Body LG: The quick brown fox jumps over the lazy dog
                    </BodyLG>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="r7p_unu"
                    >
                      text-lg leading-7
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="m2ckacp"
                  >
                    <BodyMD data-oid="kdak4v9">
                      Body MD: The quick brown fox jumps over the lazy dog
                    </BodyMD>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="3lt:5fc"
                    >
                      text-base leading-6
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=":2zl4j."
                  >
                    <BodySM data-oid="385o_uq">
                      Body SM: The quick brown fox jumps over the lazy dog
                    </BodySM>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="x1f.6q5"
                    >
                      text-sm leading-5
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="j4thniv"
                  >
                    <BodyXS data-oid="8:dqlii">
                      Body XS: The quick brown fox jumps over the lazy dog
                    </BodyXS>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="sk.7cua"
                    >
                      text-xs leading-4
                    </BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent
        value="responsive"
        className="mt-6 space-y-6"
        data-oid="enh4nho"
      >
        <Card variant="default" elevation="medium" data-oid="a955aa-">
          <CardHeader data-oid="vbt.c7_">
            <div className="flex items-center gap-2" data-oid="sdsc5-w">
              <TextIcon className="h-5 w-5 text-primary" data-oid="h_7kodm" />
              <CardTitle data-oid="5dn69:e">Responsive Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent data-oid="0h4r.jv">
            <div className="space-y-8" data-oid="ehgai6r">
              <div data-oid="t1i3htt">
                <h3 className="text-xl font-medium mb-4" data-oid="0_v9o.1">
                  Responsive Headings
                </h3>
                <BodySM className="mb-4" data-oid="39x.f4.">
                  Resize your browser to see how these headings adapt to
                  different screen sizes.
                </BodySM>
                <div className="space-y-4" data-oid="tr_ctul">
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="6rtop4h"
                  >
                    <ResponsiveHeadingXL data-oid="r5d2-0v">
                      Responsive Heading XL
                    </ResponsiveHeadingXL>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid=":_7odv0"
                    >
                      text-2xl md:text-3xl lg:text-4xl
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="0vsifpp"
                  >
                    <ResponsiveHeadingLG data-oid="8vadn00">
                      Responsive Heading LG
                    </ResponsiveHeadingLG>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="hdf46v0"
                    >
                      text-xl md:text-2xl lg:text-3xl
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=":eavb50"
                  >
                    <ResponsiveHeadingMD data-oid=":289t2j">
                      Responsive Heading MD
                    </ResponsiveHeadingMD>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="mv6bhs9"
                    >
                      text-lg md:text-xl lg:text-2xl
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="ll1zncr"
                  >
                    <ResponsiveHeadingSM data-oid="rfadvsj">
                      Responsive Heading SM
                    </ResponsiveHeadingSM>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="30jrbb6"
                    >
                      text-base md:text-lg lg:text-xl
                    </BodyXS>
                  </div>
                </div>
              </div>

              <div data-oid=".tti6qs">
                <h3 className="text-xl font-medium mb-4" data-oid="469en15">
                  Responsive Body Text
                </h3>
                <BodySM className="mb-4" data-oid="x-dq8nm">
                  Resize your browser to see how these text sizes adapt to
                  different screen sizes.
                </BodySM>
                <div className="space-y-4" data-oid="ly-xo8b">
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=":tkoq2t"
                  >
                    <ResponsiveBodyLG data-oid="py6gbur">
                      Responsive Body LG: The quick brown fox jumps over the
                      lazy dog
                    </ResponsiveBodyLG>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="i954yrg"
                    >
                      text-base md:text-lg leading-7
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid="t7qg-ad"
                  >
                    <ResponsiveBodyMD data-oid="r60_ceb">
                      Responsive Body MD: The quick brown fox jumps over the
                      lazy dog
                    </ResponsiveBodyMD>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="s-jmmpm"
                    >
                      text-sm md:text-base leading-6
                    </BodyXS>
                  </div>
                  <div
                    className="p-2 border-l-4 border-primary"
                    data-oid=".3y3ydk"
                  >
                    <ResponsiveBodySM data-oid="hpxferb">
                      Responsive Body SM: The quick brown fox jumps over the
                      lazy dog
                    </ResponsiveBodySM>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="4uug458"
                    >
                      text-xs md:text-sm leading-5
                    </BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent
        value="utilities"
        className="mt-6 space-y-6"
        data-oid="f.y4i.g"
      >
        <Card variant="default" elevation="medium" data-oid="u7hpk2i">
          <CardHeader data-oid="pou:bqi">
            <div className="flex items-center gap-2" data-oid="3qwdcqz">
              <TextIcon className="h-5 w-5 text-primary" data-oid=".ds89y3" />
              <CardTitle data-oid="4jn.3i9">Typography Utilities</CardTitle>
            </div>
          </CardHeader>
          <CardContent data-oid=":4dy9it">
            <div className="space-y-8" data-oid="ptguw8b">
              <div data-oid="j1natz-">
                <h3 className="text-xl font-medium mb-4" data-oid="7b5rtqe">
                  Text Truncation
                </h3>
                <div className="space-y-4" data-oid="8hgj58k">
                  <div
                    className="p-4 border rounded-md max-w-md"
                    data-oid="inyu4ug"
                  >
                    <h4 className="text-sm font-medium mb-2" data-oid=":ch_k-v">
                      Single Line Truncation
                    </h4>
                    <TruncatedText
                      variant="body-md"
                      lines={1}
                      data-oid="lrn:223"
                    >
                      This is a very long text that will be truncated after a
                      single line. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Nullam euismod, nisl eget aliquam
                      ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc
                      quis nisl.
                    </TruncatedText>
                  </div>
                  <div
                    className="p-4 border rounded-md max-w-md"
                    data-oid="ei:bxgt"
                  >
                    <h4 className="text-sm font-medium mb-2" data-oid="ankaq8z">
                      Two Lines Truncation
                    </h4>
                    <TruncatedText
                      variant="body-md"
                      lines={2}
                      data-oid="agvyhaj"
                    >
                      This is a very long text that will be truncated after two
                      lines. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Nullam euismod, nisl eget aliquam ultricies, nunc
                      nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                      Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                      aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </TruncatedText>
                  </div>
                  <div
                    className="p-4 border rounded-md max-w-md"
                    data-oid="t2vb.oc"
                  >
                    <h4 className="text-sm font-medium mb-2" data-oid=".2p8n5h">
                      Three Lines Truncation
                    </h4>
                    <TruncatedText
                      variant="body-md"
                      lines={3}
                      data-oid="wn.wddp"
                    >
                      This is a very long text that will be truncated after
                      three lines. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Nullam euismod, nisl eget aliquam
                      ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc
                      quis nisl. Nullam euismod, nisl eget aliquam ultricies,
                      nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                      Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                      aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </TruncatedText>
                  </div>
                </div>
              </div>

              <div data-oid="o:5cn1q">
                <h3 className="text-xl font-medium mb-4" data-oid="8faacbu">
                  Text Alignment
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="i:l45d9"
                >
                  <div className="p-4 border rounded-md" data-oid="clrbzfe">
                    <h4 className="text-sm font-medium mb-2" data-oid="9j6p:j1">
                      Left Aligned
                    </h4>
                    <Typography
                      variant="body-md"
                      align="left"
                      data-oid="v8twad2"
                    >
                      This text is aligned to the left. This is the default
                      alignment for most text content in Western languages.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="0g_omg2">
                    <h4 className="text-sm font-medium mb-2" data-oid="s1cf1g9">
                      Center Aligned
                    </h4>
                    <Typography
                      variant="body-md"
                      align="center"
                      data-oid="w7a16e7"
                    >
                      This text is centered. Center alignment is often used for
                      headings, quotes, or other special content.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="u4fzqdv">
                    <h4 className="text-sm font-medium mb-2" data-oid="5ko1ezl">
                      Right Aligned
                    </h4>
                    <Typography
                      variant="body-md"
                      align="right"
                      data-oid="x7ks2x0"
                    >
                      This text is aligned to the right. Right alignment is
                      sometimes used for numbers in tables or RTL languages.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="fbyytuf">
                    <h4 className="text-sm font-medium mb-2" data-oid="z-75ykw">
                      Justified
                    </h4>
                    <Typography
                      variant="body-md"
                      align="justify"
                      data-oid="6beetw6"
                    >
                      This text is justified. Justified text aligns to both the
                      left and right margins, creating a clean edge on both
                      sides. It&apos;s often used in print but can be harder to
                      read on screens.
                    </Typography>
                  </div>
                </div>
              </div>

              <div data-oid="9s6l_7r">
                <h3 className="text-xl font-medium mb-4" data-oid="7_mg2wg">
                  Text Transformation
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="u:ciwyr"
                >
                  <div className="p-4 border rounded-md" data-oid="64g4sbp">
                    <h4 className="text-sm font-medium mb-2" data-oid=":1n6wre">
                      Uppercase
                    </h4>
                    <Typography
                      variant="body-md"
                      transform="uppercase"
                      data-oid="cb4zf6v"
                    >
                      This text is transformed to uppercase.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="u2nqimm">
                    <h4 className="text-sm font-medium mb-2" data-oid="o96ux4g">
                      Lowercase
                    </h4>
                    <Typography
                      variant="body-md"
                      transform="lowercase"
                      data-oid="po5p6me"
                    >
                      THIS TEXT IS TRANSFORMED TO LOWERCASE.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="gp0yls4">
                    <h4 className="text-sm font-medium mb-2" data-oid="5sy2ivl">
                      Capitalize
                    </h4>
                    <Typography
                      variant="body-md"
                      transform="capitalize"
                      data-oid="feok6ek"
                    >
                      this text has each word capitalized.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="8cct:8h">
                    <h4 className="text-sm font-medium mb-2" data-oid="v5.l.gc">
                      Normal Case
                    </h4>
                    <Typography
                      variant="body-md"
                      transform="normalCase"
                      data-oid="5.pk:n3"
                    >
                      This text preserves its original case.
                    </Typography>
                  </div>
                </div>
              </div>

              <div data-oid="px146ze">
                <h3 className="text-xl font-medium mb-4" data-oid="p6n2941">
                  Font Weight
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-oid="0bx7an7"
                >
                  <div className="p-4 border rounded-md" data-oid="l411c-o">
                    <h4 className="text-sm font-medium mb-2" data-oid="tku7oq2">
                      Light
                    </h4>
                    <Typography
                      variant="body-md"
                      weight="light"
                      data-oid="8-.8pat"
                    >
                      This text has a light font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="ebvpys_">
                    <h4 className="text-sm font-medium mb-2" data-oid="uimxydu">
                      Normal
                    </h4>
                    <Typography
                      variant="body-md"
                      weight="normal"
                      data-oid="pzsnbbm"
                    >
                      This text has a normal font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="dp2v.jt">
                    <h4 className="text-sm font-medium mb-2" data-oid="__f82y4">
                      Medium
                    </h4>
                    <Typography
                      variant="body-md"
                      weight="medium"
                      data-oid="5j.baj."
                    >
                      This text has a medium font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="_kwl.h.">
                    <h4 className="text-sm font-medium mb-2" data-oid="8to6wm4">
                      Semibold
                    </h4>
                    <Typography
                      variant="body-md"
                      weight="semibold"
                      data-oid="_zi4tc."
                    >
                      This text has a semibold font weight.
                    </Typography>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="9zzw7_-">
                    <h4 className="text-sm font-medium mb-2" data-oid="-x2u_aw">
                      Bold
                    </h4>
                    <Typography
                      variant="body-md"
                      weight="bold"
                      data-oid=":s:xjv_"
                    >
                      This text has a bold font weight.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent
        value="special"
        className="mt-6 space-y-6"
        data-oid="x9y6.6t"
      >
        <Card variant="default" elevation="medium" data-oid="tozu2l.">
          <CardHeader data-oid="8qb-x.i">
            <div className="flex items-center gap-2" data-oid="4ee0x-r">
              <TextIcon className="h-5 w-5 text-primary" data-oid="2h-ptnj" />
              <CardTitle data-oid="eu:-q:h">Special Typography</CardTitle>
            </div>
          </CardHeader>
          <CardContent data-oid="sw.s8t8">
            <div className="space-y-8" data-oid="lhes9bt">
              <div data-oid="nctfd5n">
                <h3 className="text-xl font-medium mb-4" data-oid="3xrpcb7">
                  UI-Specific Typography
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  data-oid="h6jhr86"
                >
                  <div className="p-4 border rounded-md" data-oid="el2_fnk">
                    <h4 className="text-sm font-medium mb-2" data-oid="500oiyr">
                      Stat
                    </h4>
                    <div className="flex items-center gap-2" data-oid="ccsvsux">
                      <Stat data-oid="5359ziv">$12,345</Stat>
                      <span
                        className="text-xs text-muted-foreground"
                        data-oid="meae1md"
                      >
                        text-2xl font-bold tracking-tight
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="25l:mm-">
                    <h4 className="text-sm font-medium mb-2" data-oid="bueqv3v">
                      Card Title
                    </h4>
                    <div className="flex items-center gap-2" data-oid="npb1bai">
                      <TypographyCardTitle data-oid="d27y9d5">
                        Recent Activity
                      </TypographyCardTitle>
                      <span
                        className="text-xs text-muted-foreground"
                        data-oid="k_uyh2u"
                      >
                        text-sm font-medium
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="89d6mt_">
                    <h4 className="text-sm font-medium mb-2" data-oid="g3uvf67">
                      Badge
                    </h4>
                    <div className="flex items-center gap-2" data-oid="cq2il66">
                      <Badge data-oid="g54.ko7">New</Badge>
                      <span
                        className="text-xs text-muted-foreground"
                        data-oid="oje4x9a"
                      >
                        text-xs font-medium
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="4uxcx41">
                    <h4 className="text-sm font-medium mb-2" data-oid="5_j4:jw">
                      Button Text
                    </h4>
                    <div className="flex items-center gap-2" data-oid="wldoue0">
                      <ButtonText data-oid="9tpwqga">Submit</ButtonText>
                      <span
                        className="text-xs text-muted-foreground"
                        data-oid="j7-daag"
                      >
                        text-sm font-medium
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="wnu8e97">
                    <h4 className="text-sm font-medium mb-2" data-oid="yc70g5.">
                      Nav Text
                    </h4>
                    <div className="flex items-center gap-2" data-oid="g5nlg.n">
                      <NavText data-oid="aa425s7">Dashboard</NavText>
                      <span
                        className="text-xs text-muted-foreground"
                        data-oid="skean:f"
                      >
                        text-sm font-medium
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div data-oid="7iifchn">
                <h3 className="text-xl font-medium mb-4" data-oid=".39a8f6">
                  Label Component
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  data-oid="q3y_ggl"
                >
                  <div className="p-4 border rounded-md" data-oid="vs3wa0o">
                    <Label size="lg" htmlFor="input-lg" data-oid="hi3i.hq">
                      Large Label
                    </Label>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid=":imcvpm"
                    >
                      text-base font-medium
                    </BodyXS>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="7i-chf0">
                    <Label size="md" htmlFor="input-md" data-oid="r8oekvc">
                      Medium Label
                    </Label>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="0.h1h9s"
                    >
                      text-sm font-medium
                    </BodyXS>
                  </div>
                  <div className="p-4 border rounded-md" data-oid="a.8c-t6">
                    <Label size="sm" htmlFor="input-sm" data-oid=":okbbmn">
                      Small Label
                    </Label>
                    <BodyXS
                      className="text-muted-foreground mt-1"
                      data-oid="nj9s.ln"
                    >
                      text-xs font-medium
                    </BodyXS>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
