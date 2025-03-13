"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
export default function HomePage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      {/* Left column */}
      <div className="flex flex-col gap-6 p-8 md:p-12">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex justify-center md:justify-start"
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

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <motion.div
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <h1
                className={typography(
                  "heading",
                  "xl",
                  "!text-3xl md:!text-4xl lg:!text-5xl",
                )}
              >
                Bienvenue
              </h1>
              <p
                className={typography(
                  "body",
                  "lg",
                  "text-muted-foreground mt-2",
                )}
              >
                Choisissez une option pour continuer
              </p>
            </motion.div>

            <div className="flex flex-col gap-5">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                <Link
                  href="/onboarding"
                  className={`
                    ${typography("label", "lg", "font-medium")}
                    h-14 flex items-center justify-center
                    rounded-xl border-2 border-border
                    bg-card hover:bg-accent/10
                    transition-all hover:border-accent
                    hover:shadow-lg
                  `}
                >
                  Dépôt de facture
                </Link>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
              >
                <Link
                  href="/login"
                  className={`
                    ${typography("label", "lg", "font-medium")}
                    h-14 flex items-center justify-center
                    rounded-xl bg-primary hover:bg-primary/90
                    text-primary-foreground
                    transition-all hover:shadow-lg
                  `}
                >
                  Register / Login
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="relative overflow-hidden lg:block m-6 rounded-xl">
        <Image
          src="/branding/bg-last.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{
              y: [-15, 15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[500px]"
          >
            <Image
              src="/branding/visual card.webp"
              alt="Payment card"
              width={1000}
              height={1000}
              className="object-contain shadow-2xl rounded-2xl border-2 border-border/50"
              quality={100}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
