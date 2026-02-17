import React, { useState } from "react";

export default function useFormFields(initialFields={}) {
  const [fields, setFields] = useState(initialFields);
  const handleChange = (e) => {
    const { target } = e;
    setFields({ ...fields, [target.name]: target.value });
  };

  return [fields,handleChange,setFields]
}
