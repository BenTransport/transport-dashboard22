import { Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
  callback: (value: string) => void; // Function to call on debounce
  name?: string; // Optional placeholder text
  debounceTime?: number; // Optional debounce delay (in ms)
}

const SearchInput: React.FC<SearchInputProps> = ({
  callback,
  name,
  debounceTime = 500, // Default debounce time
}) => {
  const [inputValue, setInputValue] = useState<string>(""); // Track input value
  const [debouncedValue, setDebouncedValue] = useState<string>(""); // Store debounced value

  // Update debounced value after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler); // Clear timeout if the user types again within the debounce period
    };
  }, [inputValue, debounceTime]);

  // Trigger the callback when debouncedValue changes
  useEffect(() => {
    if (debouncedValue) {
      callback(debouncedValue);
    }
  }, [debouncedValue, callback]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Input
      classNames={{
        input: "w-full",
        mainWrapper: "w-full",
      }}
      name={name}
      placeholder={`Search ${name}`}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
