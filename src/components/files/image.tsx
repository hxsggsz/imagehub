import Image from 'next/image'

interface ImageProps {
  image: string
}

export const ImageFile = ({ image }: ImageProps) => {
  return (
    <Image
      src={image}
      width={130}
      height={100}
      alt="image uploaded"
      className="h-28 w-32 rounded-md object-cover"
    />
  )
}
