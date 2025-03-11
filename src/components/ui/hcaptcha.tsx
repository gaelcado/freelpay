"use client";

import React, { useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface HCaptchaProps {
  sitekey?: string;
  onVerify: (token: string) => void;
}

export function HCaptchaComponent({ sitekey, onVerify }: HCaptchaProps) {
  const captchaRef = useRef<HCaptcha>(null);

  // Utiliser la clé du site à partir des variables d'environnement si non fournie
  const sitekeyToUse = sitekey || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';

  return (
    <div className="flex justify-center my-4">
      <HCaptcha
        ref={captchaRef}
        sitekey={sitekeyToUse}
        onVerify={onVerify}
        onExpire={() => onVerify('')}
        onError={() => onVerify('')}
      />
    </div>
  );
} 