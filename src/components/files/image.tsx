import Image from 'next/image'

interface ImageProps {
  image: string
}

export const ImageFile = ({ image }: ImageProps) => {
  return (
    <Image
      width={130}
      src={image}
      height={100}
      alt="image uploaded"
      className="rounded-md"
    />
  )
}
