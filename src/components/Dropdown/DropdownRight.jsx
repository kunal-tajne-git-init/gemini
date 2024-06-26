/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Switch } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const DropdownRight = ({ children, data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { options, urls, icons } = data;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Daisy UI Dropdown Used here, beacuse it provided a functionality that after clicking on open dropdown icon if you click somewhere else on the screen it will automatically close the open dropdown

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block bg-transparent text-left"
    >
      <div className="dropdown">
        <div tabIndex={0} role="button" onClick={toggleDropdown}>
          {children}
        </div>
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className=" absolute -top-[80%] left-full z-10  ml-6 w-60 -translate-y-1/2 rounded-lg bg-[#272A2C] p-2 shadow dark:bg-[272A2C]"
          >
            {options?.map((option, index) => (
              <div className="flex items-center">
                {icons[index]}
                <li key={option}>
                  <a
                    href={urls[index]}
                    target="_blank"
                    className="block px-4 py-2 text-[16px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    key={option}
                  >
                    {option}
                  </a>
                </li>
                {option === "Dark Theme" && (
                  <Switch
                    // checked={checked}
                    // onChange={handleChange}
                    className="ml-9"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownRight;
