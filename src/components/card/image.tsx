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
      className="pointer-events-none aspect-video h-[280px] select-none rounded-t-md object-cover"
    />
  )
}
