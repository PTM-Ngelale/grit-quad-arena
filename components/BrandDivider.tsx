import Image from 'next/image'

export default function BrandDivider({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-grit-black py-12 md:py-16 flex justify-center">
      <div className="relative w-40 h-40 md:w-48 md:h-48">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    </div>
  )
}
