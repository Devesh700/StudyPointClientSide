// Sidebar.jsx
import React from "react";
import Select from "react-select"

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-dvh">
      <h2 className="font-bold text-xl mb-4">Choose Stack and Technology</h2>
      <Select
      className="space-y-2"
      name="stack"
      id="stack"
      closeMenuOnSelect={true}
      options={[]}
      defaultValue={{label:"FrontEnd",value:"FrontEnd"}}
      onChange={(selectedOption)=>console.log(selectedOption)}>
      </Select>

      <Select
      className="space-y-2"
      name="technology"
      id="technology"
      closeMenuOnSelect={true}
      options={[]}
      defaultValue={{label:"React",value:"React"}}
      onChange={(selectedOption)=>console.log(selectedOption)}>
      </Select>
    </aside>
  );
};

export default Sidebar;
