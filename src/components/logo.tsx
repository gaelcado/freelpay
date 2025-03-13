import Image from 'next/image'

export function Logo() {
    return (
        <Image
            className="overflow-hidden"
            src="/branding/logo.svg"
            alt="FreelPay Logo"
            width={100}
            height={100}
        />
    )
} 