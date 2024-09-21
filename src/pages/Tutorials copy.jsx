import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillTitle, getSkillTitleById, getTopicById } from '../store/slices/tutorialSlice';
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { useLocation, useParams } from 'react-router-dom';

const Tutorials = () => {
  debugger
  const dispatch = useDispatch();
  const params = useParams();
  const navState = useLocation().state ||{};

  // Fetching data from Redux store
  // const tutorial = useSelector(state => state?.tutorials?.SkillTitle);
  const allTitle = navState?._id ? [{ ...navState }] : useSelector(state => state?.tutorials?.allTitle) ||[];
  const Topics = useSelector(state => state?.tutorials?.Topics) ||[];

  // Local state management
  const [content, setContent] = useState(null);
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeTitle, setActiveTitle] = useState(0);
  const [activeSubTitle, setActiveSubTitle] = useState(0);
  const [steps, setSteps] = useState(0);

  // Fetch all skill titles if not already loaded
  useEffect(() => {
    debugger
    if (!allTitle?.length) {
      dispatch(getAllSkillTitle());
    }
    if (params?.id && !allTitle?.length) {
      dispatch(getSkillTitleById(params.id));
    }
  }, [dispatch, params.id, allTitle]);

  // Fetch specific topic by ID if a topic is selected
  useEffect(() => {
    debugger
    if (allTitle?.length > 0 && steps === 0) {
      const topicId = allTitle[activeTitle]?.subTitle?.[activeSubTitle]?.Topics?.[activeTopic]?.id;
      if (topicId) {
        dispatch(getTopicById(topicId));
        setSteps(1); // Prevent re-fetching unless steps is reset
      }
    }
  }, [allTitle, activeTitle, activeSubTitle, activeTopic, steps, dispatch]);

  // Update content once the topic data is available
  useEffect(() => {
    if (Topics?._id) {
      let contentString = "";
      Topics?.content?.forEach(item => {
        contentString += item + "<div style='margin:1rem 0rem;'></div>";
      });
      // Clean up the content and set it
      contentString = contentString
        .replace(/`/g, "")
        .replace(/\[|\]/g, "")
        .replace(/,/g, "<div style='margin:1rem 0rem;'></div>");
      setContent(contentString);
    }
  }, [Topics]);

  return (
    <div className='flex justify-between'>
      {/* Sidebar */}
      <div className='w-3/12 max-h-dvh overflow-y-scroll'>
        {!params?.id && <Sidebar />}

        {/* List of all titles and topics */}
        {allTitle?.length > 0 && allTitle?.map((tutorial, tutIndex) => (
          <div key={tutIndex} className='w-full px-4'>
            <h1 className='text-3xl font-semibold my-4 py-2 px-2 bg-primary text-white'>{tutorial?.title}</h1>
            {tutorial?.subTitle?.map((elem, levelIndex) => (
              <div key={levelIndex} className='px-1'>
                <h3 className='text-xl font-semibold flex gap-4 items-center'>
                  <PiPaperPlaneRightBold />
                  <span>{elem?.name}</span>
                </h3>
                <ul className='px-2 my-4 list-decimal list-inside'>
                  {elem?.Topics?.map((topic, index) => (
                    <li key={index}
                      className={`capitalize my-2 cursor-pointer ${activeTitle === tutIndex && activeSubTitle === levelIndex && activeTopic === index ? 'underline text-primary' : ''}`}
                      onClick={() => {
                        setActiveTitle(tutIndex);
                        setActiveSubTitle(levelIndex);
                        setActiveTopic(index);
                        setSteps(0); // Reset steps to trigger fetching
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
      <div className='w-9/12'>
        {content ?
          <div className='p-4' dangerouslySetInnerHTML={{ __html: content }}></div> :
          <div className='place-custom-center-2'>
            <h3 className='text-2xl font-semibold w-fit'>
              No Content has been added for selected skills. Please send us feedback, mentioning the topic name that is unavailable, and we will notify you once it’s available.
            </h3>
          </div>
        }
      </div>
    </div>
  );
};

export default Tutorials;
