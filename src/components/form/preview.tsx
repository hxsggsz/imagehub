import Image from 'next/image'

interface PreviewProps {
  image: string
}

export const Preview = ({ image }: PreviewProps) => {
  return (
    <Image
      src={image}
      width={350}
      height={100}
      alt="preview of the folder image"
      className="mt-2 rounded-md border-4 border-b-[6px] border-cyan-700"
    />
  )
}
