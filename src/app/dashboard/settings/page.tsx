"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { HeadingLG, BodyMD } from "@/components/ui/typography";
import { Building, User } from "lucide-react";
export default function SettingsPage() {
  return (
    <div className="space-y-6" data-oid="gv_17o2">
      <div data-oid="18j6bls">
        <HeadingLG data-oid="y_.1.l5">Paramètres</HeadingLG>
        <BodyMD className="text-muted-foreground" data-oid="fwqfa7m">
          Gérez vos préférences et informations personnelles
        </BodyMD>
      </div>

      <Tabs defaultValue="profile" className="w-full" data-oid="ruymbbh">
        <TabsList
          className="grid w-full grid-cols-2 md:w-auto md:inline-flex"
          data-oid="-yogrrq"
        >
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2"
            data-oid="jf0x-jj"
          >
            <User className="h-4 w-4" data-oid="-7p_qft" />
            <span data-oid="3x1s9cl">Profil</span>
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="flex items-center gap-2"
            data-oid="a19.7o-"
          >
            <Building className="h-4 w-4" data-oid="qciz9s3" />
            <span data-oid="4az9ze9">Entreprise</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="profile"
          className="mt-6 space-y-6"
          data-oid="8:3ocpc"
        >
          <Card variant="default" elevation="medium" data-oid="4c3uqfd">
            <CardHeader data-oid="svx-zaa">
              <CardTitle data-oid="unz:7ow">
                Informations personnelles
              </CardTitle>
              <CardDescription data-oid="c:jt5.k">
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="0-ihcf6">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-oid="_1l7ba3"
              >
                <div className="space-y-2" data-oid="2xyccxs">
                  <Label htmlFor="first-name" data-oid="8y-_1uy">
                    Prénom
                  </Label>
                  <Input
                    id="first-name"
                    defaultValue="John"
                    data-oid="z:wqk7n"
                  />
                </div>
                <div className="space-y-2" data-oid="bhz57ye">
                  <Label htmlFor="last-name" data-oid="vlv4uon">
                    Nom
                  </Label>
                  <Input id="last-name" defaultValue="Doe" data-oid="6odfdwk" />
                </div>
              </div>

              <div className="space-y-2" data-oid="jpb4:po">
                <Label htmlFor="email" data-oid="h9wxx14">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@freelpay.com"
                  data-oid="dqi_xzw"
                />
              </div>

              <div className="space-y-2" data-oid="pj_0.8c">
                <Label htmlFor="phone" data-oid="fgvewtg">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+33 1 23 45 67 89"
                  data-oid="6.nzrw4"
                />
              </div>
            </CardContent>
            <CardFooter data-oid="y.4uxoj">
              <Button data-oid="c6zcrbg">Sauvegarder</Button>
            </CardFooter>
          </Card>

          <Card variant="default" elevation="medium" data-oid="9xw36jh">
            <CardHeader data-oid="1fsqh0s">
              <CardTitle data-oid="o_k0tvf">Notifications</CardTitle>
              <CardDescription data-oid=".u.nm9m">
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="q:abtnx">
              <div
                className="flex items-center justify-between"
                data-oid="ummsk0z"
              >
                <div data-oid="pk2ssrv">
                  <Label htmlFor="email-notifications" data-oid="og.pce2">
                    Notifications par email
                  </Label>
                  <BodyMD className="text-muted-foreground" data-oid="qr572l6">
                    Recevez des notifications par email pour les mises à jour
                    importantes
                  </BodyMD>
                </div>
                <Switch
                  id="email-notifications"
                  defaultChecked
                  data-oid="ze1_mwg"
                />
              </div>

              <div
                className="flex items-center justify-between"
                data-oid="xkynyam"
              >
                <div data-oid="tey2_j8">
                  <Label htmlFor="sms-notifications" data-oid="-c4gez9">
                    Notifications par SMS
                  </Label>
                  <BodyMD className="text-muted-foreground" data-oid="6uc20wp">
                    Recevez des notifications par SMS pour les mises à jour
                    urgentes
                  </BodyMD>
                </div>
                <Switch id="sms-notifications" data-oid="mu6mc77" />
              </div>

              <div
                className="flex items-center justify-between"
                data-oid="hhz4z61"
              >
                <div data-oid="d4b2hx7">
                  <Label htmlFor="marketing-notifications" data-oid="88nh19w">
                    Communications marketing
                  </Label>
                  <BodyMD className="text-muted-foreground" data-oid=":c-bv1z">
                    Recevez des informations sur nos nouveaux services et offres
                  </BodyMD>
                </div>
                <Switch id="marketing-notifications" data-oid="tf3jloi" />
              </div>
            </CardContent>
            <CardFooter data-oid="4d3a4td">
              <Button data-oid="qa5bp8v">Sauvegarder</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="company"
          className="mt-6 space-y-6"
          data-oid="myuze0l"
        >
          <Card variant="default" elevation="medium" data-oid="cyo6jfg">
            <CardHeader data-oid="t4:2xbs">
              <CardTitle data-oid="hd5ol1:">
                Informations de l'entreprise
              </CardTitle>
              <CardDescription data-oid="nsd220n">
                Mettez à jour les informations de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="aunud-1">
              <div className="space-y-2" data-oid="bq0n5ri">
                <Label htmlFor="company-name" data-oid="e73c2e8">
                  Nom de l'entreprise
                </Label>
                <Input
                  id="company-name"
                  defaultValue="Freelance Pro"
                  data-oid="m84yip_"
                />
              </div>

              <div className="space-y-2" data-oid="6t1j77w">
                <Label htmlFor="siret" data-oid="fv4.tw-">
                  Numéro SIRET
                </Label>
                <Input
                  id="siret"
                  defaultValue="12345678901234"
                  data-oid="6-og_r8"
                />
              </div>

              <div className="space-y-2" data-oid="zssta9q">
                <Label htmlFor="vat" data-oid="y6z62v6">
                  Numéro de TVA
                </Label>
                <Input
                  id="vat"
                  defaultValue="FR12345678901"
                  data-oid="byp0bp5"
                />
              </div>

              <div className="space-y-2" data-oid="em_nrk-">
                <Label htmlFor="address" data-oid="1sttt:c">
                  Adresse
                </Label>
                <Textarea
                  id="address"
                  defaultValue="123 Rue de Paris&#10;75001 Paris&#10;France"
                  data-oid="eu4zg3v"
                />
              </div>
            </CardContent>
            <CardFooter data-oid="y4wzi:b">
              <Button data-oid="u0-ptd_">Sauvegarder</Button>
            </CardFooter>
          </Card>

          <Card variant="default" elevation="medium" data-oid="a_zup8n">
            <CardHeader data-oid=".2q3ij:">
              <CardTitle data-oid="-ga9-cv">Coordonnées bancaires</CardTitle>
              <CardDescription data-oid=".epd2-6">
                Mettez à jour vos coordonnées bancaires pour les paiements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="1dz._ou">
              <div className="space-y-2" data-oid="bqsapbl">
                <Label htmlFor="bank-name" data-oid="16coqcg">
                  Nom de la banque
                </Label>
                <Input
                  id="bank-name"
                  defaultValue="Banque Nationale"
                  data-oid="v9y8inf"
                />
              </div>

              <div className="space-y-2" data-oid="7wjn1vg">
                <Label htmlFor="iban" data-oid="9sy94x3">
                  IBAN
                </Label>
                <Input
                  id="iban"
                  defaultValue="FR76 1234 5678 9012 3456 7890 123"
                  data-oid="z7yuesf"
                />
              </div>

              <div className="space-y-2" data-oid="1.gw9vh">
                <Label htmlFor="bic" data-oid="h7lki94">
                  BIC
                </Label>
                <Input id="bic" defaultValue="BNPAFRPP" data-oid="68vwi0c" />
              </div>
            </CardContent>
            <CardFooter data-oid="9w30k4b">
              <Button data-oid="yav47sb">Sauvegarder</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
