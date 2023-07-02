import Image from "next/image"

interface ImageCardProps {
  image: string
}
 
export const ImageCard = ({ image }: ImageCardProps) => {
  return <Image
  width={400}
  height={100}
  alt="test"
  className="rounded-t-md"
  src={image}
/>
}