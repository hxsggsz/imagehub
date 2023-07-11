interface TitleProps {
  title: string
}

export const Title = ({ title }: TitleProps) => {
  return <h1 className="text-xl font-bold">{title}</h1>
}
