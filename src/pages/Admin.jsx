import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { addSkillTitle, getAllSkillTitle, getSkillTitleById } from '../store/slices/tutorialSlice';

const Admin = () => {
    const dispatch = useDispatch();
    const title = useSelector(state => state?.tutorials?.allTitle);
    const animatedComponents = makeAnimated();

    // Sample data for titles and subtitles
    const [initialTitles, setInitialTitles] = useState([
        { label: 'React Basics', value: 'react_basics' },
        { label: 'Node.js Introduction', value: 'node_intro' },
    ])



    // States
    const [titles, setTitles] = useState(null);
    const [selectedTitleId, setTitleId] = useState();
    const [level, setlevel] = useState(null);
    const [subtitles, setSubtitles] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedSubtitle, setSelectedSubtitle] = useState(null);
    const [selectedlevel, setSelectedlevel] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newSubtitle, setNewSubtitle] = useState('');
    const [name, setName] = useState('');
    const [content, setcontent] = useState();


    useEffect(() => {
        dispatch(getAllSkillTitle());
    }, [dispatch])

    useEffect(() => {
        console.log(title);
        console.log(initialTitles);
        setInitialTitles(title?.map(item => ({ label: item.title, value: item.title })));

    }, [title])



    // Add new title or subtitle
    const addNewTitle = () => {
        console.log(newTitle)
        dispatch(addSkillTitle(newTitle))
    };

    const CreateTopic = async () => {
        let token = JSON.parse(sessionStorage.getItem("user")).accessToken;
        let topicData = { name, content, titleId: selectedTitleId, level: selectedlevel }
        console.log(topicData);
        //alert("success")
        const response = await fetch("https://wbalay.onrender.com/api/v1/topics/add", {
            method: "POST",
            body: JSON.stringify(topicData),
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        // if (newSubtitle) {
        //     const newOption = { label: newSubtitle, value: newSubtitle.toLowerCase().replace(/\s/g, '_') };
        //     setSubtitles([...subtitles, newOption]);
        //     setNewSubtitle('');
        // }
    };

    const handleTitleChange = (val) => {
        //debugger;
        console.log(val);
        setSelectedTitle({ label: val, value: val });
        setTitleId(title?.filter(item => item.title === val)[0]._id)
        let level = title?.filter(item => item.title === val)[0]?.subTitle;
        let levelData = level?.map(elem => ({ label: elem.name, value: elem.name }));
        setlevel(levelData);
    }
    const handlelevelChange = (val) => {
        //debugger;
        setSelectedlevel({ label: val, value: val });
        let subTitle = title?.filter(item => item.title === selectedTitle.value)[0].
            subTitle?.filter(item2 => item2.name === val)[0].
            Topics?.map(elem => ({ label: elem.name, value: elem.name }));
        setSubtitles(subTitle);
    }

    // Handle content array (add/remove content fields)
    // const handleContentChange = (index, value) => {
    //     const newcontent = [...content];
    //     newcontent[index] = value;
    //     setcontent(newcontent);
    // };

    // const addContentField = () => {
    //     setcontent([...content, '']);
    // };

    // const removeContentField = (index) => {
    //     const newcontent = content.filter((_, i) => i !== index);
    //     setcontent(newcontent);
    // };

    return (
        <div className="w-full px-6 py-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create Tutorial Content</h1>

            {/* Title Selection / Creation */}
            <div className="my-4">
                <label className="block mb-2 font-medium">Select or Create Title</label>
                <Select
                    components={animatedComponents}
                    options={initialTitles}
                    value={selectedTitle}
                    onChange={(e) => handleTitleChange(e.value)}
                    placeholder="Select Title..."
                    className="mb-4"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => {
                            setNewTitle(e.target.value)

                        }}
                        placeholder="Create New Title"
                        className="px-4 py-2 border rounded w-full"
                    />
                    <button
                    type='button'
                        onClick={addNewTitle}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Title
                    </button>
                </div>
            </div>

            {/* Subtitle Selection / Creation */}
            <div className="my-4">
                <label className="block mb-2 font-medium">Select level</label>
                <Select
                    isDisabled={!level}
                    components={animatedComponents}
                    options={level}
                    value={selectedlevel}
                    onChange={(e) => handlelevelChange(e.value)}
                    placeholder="Select level..."
                    className="mb-4"
                />
            </div>


            {/* <div className="my-4">
                <label className="block mb-2 font-medium">Select or Create Subtitle</label>
                <Select
                isDisabled={!subtitles}
                    components={animatedComponents}
                    options={subtitles}
                    value={selectedSubtitle}
                    onChange={(e)=>setSelectedSubtitle({label:e.value,value:e.value})}
                    placeholder="Select Subtitle..."
                    className="mb-4"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="Create New Subtitle"
                        className="px-4 py-2 border rounded w-full"
                    />
                    <button
                        onClick={addNewSubtitle}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Subtitle
                    </button>
                </div>
            </div> */}

            {/* Name Input */}
            <div className="my-4">
                <label className="block mb-2 font-medium">Topic Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter tutorial name"
                    className="w-full px-4 py-2 border rounded"
                />
            </div>

            {/* Content Array */}
            <div className="my-4">
                <label className="block mb-2 font-medium">Content</label>
                <div className="flex gap-2 mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                        placeholder="Enter content"
                        className="w-full px-4 py-2 border rounded"
                    />
                    {/* <button
                            type="button"
                            onClick={() => removeContentField(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Remove
                        </button> */}
                </div>
                {/* <button
                    type="button"
                    onClick={addContentField}
                    className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                >
                    Add More Content
                </button> */}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    onClick={() => CreateTopic()}
                    type="submit"
                    className="w-full bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                >
                    Create Tutorial
                </button>
            </div>
        </div>
    );
};

export default Admin;






