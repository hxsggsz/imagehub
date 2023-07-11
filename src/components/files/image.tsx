import Image from 'next/image'

interface ImageProps {
  image: string
}

export const ImageFile = ({ image }: ImageProps) => {
  return (
    <Image
      width={130}
      height={100}
      src={image}
      alt="image uploaded"
      className="rounded-md border-2 border-b-4 border-cyan-700"
    />
  )
}
