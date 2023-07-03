import Image from 'next/image'

interface ImageCardProps {
  image: string
}

export const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <Image
      alt="test"
      src={image}
      width={512}
      height={100}
      className="pointer-events-none select-none rounded-t-md"
    />
  )
}
