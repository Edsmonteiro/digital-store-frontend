export default function FilterGroup({title,inputType='radio',options,value,onChange}) {
  return <fieldset className="filter-group"><legend>{title}</legend>
    {options.map(option => {
      const optionValue = option.value ?? option.text;
      return <label key={optionValue} className="filter-option">
      <input type={inputType} name={title} value={optionValue} checked={value === optionValue} onChange={() => onChange?.(optionValue)} />
      <span>{option.text}</span>
    </label>})}
  </fieldset>;
}
