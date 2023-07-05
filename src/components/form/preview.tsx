import Image from 'next/image'

interface PreviewProps {
  image: string | undefined
}

export const Preview = ({ image }: PreviewProps) => {
  return (
    <>
      {image && (
        <Image
          src={image}
          width={350}
          height={100}
          quality={100}
          alt="preview of the folder image"
          className="mt-2 max-h-[360px] w-full rounded-md border-4 border-b-[6px] border-cyan-700"
        />
      )}
    </>
  )
}
