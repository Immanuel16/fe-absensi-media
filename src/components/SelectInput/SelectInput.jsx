import React, { useState } from 'react';
import { DownOutlined } from "@ant-design/icons";

const SelectInput = ({options, onChange, name, value, placeholder}) => {
  const [open, setOpen] = useState(false);
  const onSelectOption = (option) => {
    onChange(option);
    setOpen(prev => !prev)
  }
  return (
    <div className="flex flex-col relative border rounded-lg">
      <div className="flex justify-between items-center p-4 text-xs" onClick={() => setOpen(prev => !prev)}>
        <input type="text" readOnly className='outline-none p-0 text-xs w-full' style={{borderWidth: '0px'}} value={value} onChange={onChange} name={name} placeholder={placeholder} />
        <DownOutlined size={14} style={{color: 'rgba(0, 0, 0, 0.25)'}} />
      </div>

      {!open && (
        <div className="flex flex-col absolute w-full border bg-white z-10 top-14 space-y-3 py-3">
          <div className="px-4" onClick={() => onSelectOption({label: '', value: ''})}>
            Pilih hasil kunjungan
          </div>
          {
            options.map(option => (
              <div className="px-4" key={option.value} onClick={() => onSelectOption(option)}>
                {option.label}
              </div>
            ))
          }
        </div>
      )}

    </div>
  )
}

export default SelectInput