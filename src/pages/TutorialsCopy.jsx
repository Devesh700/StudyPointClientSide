import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillTitle, getSkillTitleById, getTopicById } from '../store/slices/tutorialSlice';
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { skillNames } from './Components/DummyData';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const TutorialsCopy = () => {
  const dispatch = useDispatch();
  const allTitles = useSelector(state => state?.tutorials?.allTitle) || [];
  const tutorial = useSelector(state => state?.tutorials?.SkillTitle);
  const topics = useSelector(state => state?.tutorials?.Topics) || [];

  // Local state management
  const [content, setContent] = useState(null);
  const [activeTopic, setActiveTopic] = useState({ titleIdx: 0, subTitleIdx: 0, topicIdx: 0 });
  const [steps, setSteps] = useState(0);
  const [skillData, setSkillData] = useState({});
  const [selectedTitleId, setSelectedTitleId] = useState(0);
  const [visibleTitleBar,setvisibleTitleBar]=useState(false);

  // Helper function to normalize and check skill similarity
  const isSkillSimilar = (skill, names) => {
    return names.some(name => {
      const regex = new RegExp(`^${name.trim().toLowerCase()}$`, 'i'); // Case-insensitive match
      return regex.test(skill.trim().toLowerCase());
    });
  };

  // Organize skill titles into categories (FrontEnd, Backend, Devops)
  const categorizeSkills = () => {
    const frontEnd = allTitles.filter(skill => isSkillSimilar(skill.title, skillNames["FrontEnd"])) || [];
    const backend = allTitles.filter(skill => isSkillSimilar(skill.title, skillNames["Backend"])) || [];
    const devops = allTitles.filter(skill => isSkillSimilar(skill.title, skillNames["Devops"])) || [];

    setSkillData({ FrontEnd: frontEnd, Backend: backend, Devops: devops });
  };

  // Fetch all skill titles on initial load
  useEffect(() => {
    if (!allTitles?.length>0) {
      dispatch(getAllSkillTitle());
    } else {
      categorizeSkills();
    }
  }, [allTitles, dispatch]);

  // Fetch skill details by ID when a title is selected
  useEffect(() => {
    if (selectedTitleId) {
      dispatch(getSkillTitleById(selectedTitleId));
      setContent(null);
    }
  }, [selectedTitleId, dispatch]);

  // Fetch specific topic data when needed
  const fetchTopicData = (tutorialData) => {
    const topicId = tutorialData?.subTitle?.[activeTopic.subTitleIdx]?.Topics?.[activeTopic.topicIdx]?.id;
    if (topicId) {
      dispatch(getTopicById(topicId));
      setSteps(1); // Prevent re-fetching
    }
  };

  // Fetch topic based on tutorial or selected title
  useEffect(() => {
    if (!tutorial?._id && allTitles.length > 0 && steps === 0) {
      fetchTopicData(allTitles[activeTopic.titleIdx]);
    } else if (tutorial?._id && steps !== 1) {
      fetchTopicData(tutorial);
    }
  }, [tutorial, allTitles, activeTopic, steps, dispatch]);

  // Update content when topics data is available
  useEffect(() => {
    if (topics?._id) {
       let content="";
  topics?.content?.forEach(item=>{content+=item+"<div style='margin:1rem 0rem;'></div>"})
  content=content.replace(/`/g,"")
  content=content.replace("[","")
  content=content.replace("]","")
  // content=content.replace(/,/g,"<div style='margin:1rem 0rem;'></div>")

      setContent(content);
      setSteps(2);
    }
  }, [topics]);

  return (
    <div className='flex justify-between relative overflow-hidden'>
      {/* Sidebar */}
      <div className={`${!visibleTitleBar?"right-full":"left-0"} w-3/12 max-h-dvh overflow-y-scroll md:static fixed z-10 min-w-72 bg-slate-50 top-16`}>
        <Sidebar data={skillData} setParentData={setSelectedTitleId} />

        {/* Skill Titles and Topics */}
        {allTitles.length > 0 && ((tutorial?._id && [tutorial]) || allTitles).map((tutorialItem, tutorialIdx) => (
          <div key={tutorialIdx} className='w-full px-4'>
            <h1 className='text-3xl font-semibold my-4 py-2 px-2 bg-primary text-white'>
              {tutorialItem?.title}
            </h1>
            {tutorialItem?.subTitle?.map((subTitle, subTitleIdx) => (
              <div key={subTitleIdx} className='px-1'>
                <h3 className='text-xl font-semibold flex gap-4 items-center'>
                  <PiPaperPlaneRightBold />
                  <span>{subTitle?.name}</span>
                </h3>
                <ul className='px-2 my-4 list-decimal list-inside'>
                  {subTitle?.Topics?.map((topic, topicIdx) => (
                    <li key={topicIdx}
                      className={`capitalize my-2 cursor-pointer ${activeTopic.titleIdx === tutorialIdx && activeTopic.subTitleIdx === subTitleIdx && activeTopic.topicIdx === topicIdx ? 'underline text-primary' : ''}`}
                      onClick={() => {
                        setActiveTopic({ titleIdx: tutorialIdx, subTitleIdx: subTitleIdx, topicIdx: topicIdx });
                        setSteps(0); // Reset steps to trigger re-fetching
                      }}>
                      <a>{topic?.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Content Display */}
      <div className='md:w-9/12 relative w-full'>
      <div className={`${visibleTitleBar?"translate-x-72":""}  md:hidden`}>{visibleTitleBar?<FaArrowLeftLong onClick={()=>setvisibleTitleBar(false)}/>:<FaArrowRightLong onClick={()=>setvisibleTitleBar(true)}/>}</div>
        {content ? (
          <div className='p-4' dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          steps !== 2 ? (
            <div className='place-custom-center-2'>Loading...</div>
          ) : (
            <div className='place-custom-center-2'>
              <h3 className='text-2xl font-semibold w-fit'>
                No content has been added for the selected skill. Please provide feedback mentioning the missing topic, and we will notify you once it's available.
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TutorialsCopy;
