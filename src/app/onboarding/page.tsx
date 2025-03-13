"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import Link from "next/link";
import { typography } from "@/lib/typography";
export default function OnboardingPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      {/* Left column - Onboarding Form */}
      <div className="flex flex-col p-4 md:p-8 lg:p-12">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex justify-center md:justify-start mb-6"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-primary/10 p-2 rounded-lg transition-colors group-hover:bg-primary/20"
            >
              <div className="bg-primary w-6 h-6 rounded-md" />
            </motion.div>
            <span
              className={typography(
                "label",
                "lg",
                "text-primary font-semibold",
              )}
            >
              FreelPay
            </span>
          </Link>
        </motion.div>

        {/* Main onboarding flow content */}
        <div className="flex-1">
          <OnboardingFlow />
        </div>
      </div>

      {/* Right column - Background Image */}
      <div className="relative hidden lg:block">
        <Image
          src="/branding/onboarding.png"
          alt="Onboarding illustration"
          fill
          priority
          className="object-cover"
          quality={100}
        />

        <div className="absolute inset-0 bg-background/0 backdrop-blur-[1px]" />
      </div>
    </div>
  );
}
