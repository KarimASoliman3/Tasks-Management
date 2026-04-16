import {
  wrapper,
  row,
  checkbox,
} from './validationCheckboxHint.styles'

type Item = {
  label: string
  valid: boolean
}

type Props = {
  items: Item[]
}

export function ValidationCheckboxHint({ items }: Props) {
  return (
    <div className={wrapper}>
      {items.map((item, index) => (
        <label key={index} className={row}>
          <input
            type="checkbox"
            checked={item.valid}
            readOnly
            className={checkbox}
          />

          <span>
            {item.label}
          </span>
        </label>
      ))}
    </div>
  )
}