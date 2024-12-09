'use client';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { reasonsBackOrder } from '@/lib/placeholder'
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useRouter } from 'next/navigation';

interface Option {
  id: number;
  title: string;
}

export default function FixedTags() {
  const router = useRouter();
  const fixedOptions: Option[] = [];
  const [value, setValue] = React.useState([...fixedOptions, reasonsBackOrder[0]]);

  return (
    <Autocomplete
      multiple
      size="small"
      value={value}
      fullWidth={true}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => !fixedOptions.includes(option)),
        ]);

        // Actualizar los parámetros en la URL
        const ids = newValue.map((option) => option.id);
        const params = new URLSearchParams();
        if (ids.length > 0) {
          params.set('ids', ids.join(',')); 
          // Concatenar los IDs en un string separado por comas
        } else {
          params.delete('ids');
        }

        router.push(`?${params.toString()}`); // Actualiza la URL
        console.log('Opciones seleccionadas:', value)
      }}
      options={reasonsBackOrder}
      getOptionLabel={(option) => option.title}

      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps} >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}

      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              size="small"
              style={{margin:0}}
              label={option.title}
              {...tagProps}
              disabled={fixedOptions.includes(option)}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField {...params} label="Reasons Filter" placeholder="Select..." />
      )}
    />
  );
}