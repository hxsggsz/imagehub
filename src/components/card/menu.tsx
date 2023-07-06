import { DotsThreeVertical } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface MenuProps {
  id: string
  items: {
    label: string
    onSelect: (id: string) => void
  }[]
}

export const Menu = ({ id, items }: MenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DotsThreeVertical
          className="cursor-pointer hover:rounded-full hover:bg-slate-900/10"
          size={32}
          weight="bold"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={5}
        >
          {items.map((item, idx) => (
            <DropdownMenu.Item
              onClick={() => item.onSelect(id)}
              key={idx}
              className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-slate-500 hover:text-slate-100"
            >
              {item.label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
