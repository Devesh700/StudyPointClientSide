import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import Select from "react-select";

const TextEditor = ({setData}) => {
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState("");
  const [list, setList] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [exactString, setExactString] = useState([]); // Array to store multiple sections
  const [editingIndex, setEditingIndex] = useState(null); // Track which section is being edited

  // Function to generate HTML for the current text
  const generateCurrentHtml = () => {
    let val = '';
    console.log(currentText);
  if(currentText?.length>0){
    if (list) {
      let textArr = currentText.split("\n");
      console.log(textArr);
      if (fontStyle === "") {
        val = `<ul style="list-style:disc inside">
                ${textArr.map(text => `<li style="color:${color}">${text}</li>`).join('')}
              </ul>`;
      } else {
        val = `<ul style="list-style:disc inside">
                ${textArr.map(text => `<li style="color:${color}"><${fontStyle}>${text}</${fontStyle}></li>`).join('')}
              </ul>`;
      }
    } else {
      if (fontStyle === "") {
        val = `<p style="font-size:${fontSize}px;color:${color}">${currentText.replace(/\n/g, '<br>')}</p>`;
      } else {
        val = `<p style="font-size:${fontSize}px;color:${color}"><${fontStyle}>${currentText.replace(/\n/g, '<br>')}</${fontStyle}></p>`;
      }
    }
  }

    return val;
  };

  // Function to handle Save button
  const handleSave = () => {
    "";
    const newHtml = generateCurrentHtml();

    if (editingIndex !== null) {
      // Edit existing section
      const updatedStrings = exactString.map((section, index) => (
        index === editingIndex ? newHtml : section
      ));
      setExactString(updatedStrings);
      setEditingIndex(null); // Exit editing mode
    } else {
      // Add new section
      if(newHtml?.length>0)
      setExactString(prev => [...prev, newHtml]);
    }

    setCurrentText(""); // Clear the current text after saving
  };

  // Function to handle editing a section
  const handleEdit = (index) => {
    // Extract the text content from the selected HTML section for editing
    const element = document.createElement('div');
    element.innerHTML = exactString[index];

    // Remove the HTML tags and load the text into the input field for editing
    const textContent = element.innerText.replace(/<br\s*\/?>/gi, '\n');
    setCurrentText(textContent);
    setEditingIndex(index); // Set the current section as editable
  };

  // Function to delete a section
  const handleDelete = (index) => {
    const updatedStrings = exactString.filter((_, i) => i !== index);
    setExactString(updatedStrings);
  };

  useEffect(()=>{
    ""
    if(setData)
    setData(pre=>({...pre,description:exactString?.length>0?exactString:""}));
  },[exactString])

  const FontSizeOptions = [
    { label: 4, value: 4 },
    { label: 8, value: 8 },
    { label: 12, value: 12 },
    { label: 16, value: 16 },
    { label: 20, value: 20 },
    { label: 24, value: 24 },
    { label: 28, value: 28 },
  ];

  return (
    <div className='w-full border border-black rounded-lg resize py-4'>
      {/* Toolbar Section */}
      <div className='w-full py-2 px-4 flex justify-around flex-wrap items-center border-b border-gray-500'>
        <Select
          options={FontSizeOptions}
          defaultValue={FontSizeOptions[3]}
          closeMenuOnSelect={true}
          onChange={(selectedOption) => setFontSize(selectedOption.value)}
        />
        {/* Font Style Buttons */}
        <button type='button' onClick={() => setFontStyle(pre => pre !== "b" ? "b" : "")}
          className={`${fontStyle === "b" ? "bg-slate-400" : "bg-transparent"} px-4 py-2 rounded-lg`}><b>B</b></button>
        <button type='button' onClick={() => setFontStyle(pre => pre !== "i" ? "i" : "")}
          className={`${fontStyle === "i" ? "bg-slate-400" : "bg-transparent"} px-4 py-2 rounded-lg`}><i>I</i></button>
        <button type='button' onClick={() => setFontStyle(pre => pre !== "u" ? "u" : "")}
          className={`${fontStyle === "u" ? "bg-slate-400" : "bg-transparent"} px-4 py-2 rounded-lg`}><u>U</u></button>

        {/* List Toggle */}
        <div
          className={`size-10 bg-gray-100 flex flex-col justify-around items-center ${list ? "bg-gray-300" : "bg-transparent"}`}
          onClick={() => setList(!list)}>
          <ul className='w-full flex flex-col justify-around items-center gap-2'>
            <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
            <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
            <li className='w-full px-2'><div className='w-full h-px bg-black' /></li>
          </ul>
        </div>

        {/* Color Picker */}
        <input type='color' className='size-0 rounded-full' id='colorSelector' value={color} onChange={(e) => setColor(e.target.value)} />
        <label htmlFor='colorSelector' className='size-10 rounded-full' style={{ backgroundColor: color }}></label>
      </div>

      {/* Text Area Section */}
      <textarea
        className='w-full outline-none resize-none p-4 h-max'
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        placeholder="Start typing..."
      ></textarea>

      {/* Save Button */}
      <button className='bg-green-700 text-white py-2 px-6 rounded-lg mt-2' onClick={handleSave} type='button'>
        {editingIndex !== null ? "Update" : "Save"}
      </button>

      {/* Live Preview Section */}
      <div id='changeInnerHtml' className="mt-4">
        {exactString.map((section, index) => (
          <div key={index} className="mb-4  pb-2 relative">
            <div className='absolute right-8 top-0 flex gap-8 items-center'>
              <span className='text-blue-800 text-lg font-bold cursor-pointer' onClick={() => handleEdit(index)}> &#x270E;</span>
              <span className='text-red-800 text-3xl font-bold cursor-pointer' onClick={() => handleDelete(index)}> &times;</span>
              </div>
            {/* Render each saved section */}
            <div dangerouslySetInnerHTML={{ __html: section }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextEditor;
