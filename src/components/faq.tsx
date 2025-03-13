import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p className="text-muted-foreground">Find answers to common questions about our service.</p>
                    </div>

                    <Card className="w-full max-w-2xl">
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible className="w-full [&>div]:w-full">
                                <AccordionItem value="refund" className="w-full">
                                    <AccordionTrigger className="w-full">What is the refund policy?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">We offer a 30-day money back guarantee. If you are not satisfied with our product, you can request a refund within 30 days of your purchase.</p>
                                            <ol className="list-outside list-decimal space-y-2 pl-4 text-muted-foreground">
                                                <li>To request a refund, please contact our support team with your order number and reason for the refund.</li>
                                                <li>Refunds will be processed within 3-5 business days.</li>
                                                <li>Please note that refunds are only available for new customers and are limited to one per customer.</li>
                                            </ol>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="subscription" className="w-full">
                                    <AccordionTrigger className="w-full">How do I cancel my subscription?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">You can cancel your subscription at any time by logging into your account and clicking on the cancel button.</p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="upgrade" className="w-full">
                                    <AccordionTrigger className="w-full">Can I upgrade my plan?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">Yes, you can upgrade your plan at any time by logging into your account and selecting the plan you want to upgrade to.</p>
                                            <ul className="list-outside list-disc space-y-2 pl-4 text-muted-foreground">
                                                <li>You will be charged the difference in price between your current plan and the plan you are upgrading to.</li>
                                                <li>Your new plan will take effect immediately and you will be billed at the new rate on your next billing cycle.</li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="support" className="w-full">
                                    <AccordionTrigger className="w-full">Do you offer phone support?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">We do not offer phone support at this time. However, you can contact us via email or live chat for any questions or concerns you may have.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
} 