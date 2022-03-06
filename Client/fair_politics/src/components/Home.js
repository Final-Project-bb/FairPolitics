import React ,{useEffect,useContext} from 'react'
import Header from './Header';
import DiscussionCard from './DiscussionCard';
import FeedbackCard from './FeedbackCard';
import { AppContext } from "./Context";

const Home = () => {
  const { user_details, setLoading, discussionCards, setDiscussionCards } = useContext(AppContext);


    const fetchDiscussions = async (e) => {
        setLoading(true);
        // e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/get_discussion/${user_details.user_id}`);
        const data = await response.json();
        console.log("fetchDiscussions")
        console.log(data.result);
    
        if (data.result[0] != undefined) {
          setDiscussionCards(data.result);
        }
        setLoading(false);
      };
    
      const fetchPoll = async (e) => {
        setLoading(true);
        // e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/get_discussion/${user_details.user_id}`);
        const data = await response.json();
        console.log("fetchDiscussions")
        console.log(data.result);
    
        if (data.result[0] != undefined) {
          setDiscussionCards(data.result);
        }
        setLoading(false);
      };
    
      useEffect(() => {
        fetchDiscussions();
    }, []);
  
    
    const FeedbackCards = [
        {
            FeedBack_id: 1,
            user_id: 1,
            title: "first feedback",
            Questions: [
                {
                    Questions_id: 1,
                    Questions_title: "are you agree?",
                    answer: [
                        "yes",
                        "no",
                        "not sure"
                    ]
                }
            ]
        },
        {
            FeedBack_id: 2,
            user_id: 1,
            title: "secound feedback",
            Questions: [
                {
                    Questions_id: 1,
                    Questions_title: "are you agree in this secound feedback?",
                    answer: [
                        "yes",
                        "no",
                        "not sure"
                    ]
                }
            ]
        }
    ];
    return (
        <div>
            {/* <a href=''>Login<a/> */}
            <Header title="Home Page" />
            <div style={styles.head}>
                <DiscussionCard />
                <FeedbackCard FeedbackCards={FeedbackCards} />
            </div>
        </div>
    )
}

const styles = {
    head: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: 'row',
        // color:"yellow",
        //       flex: 1,

        //       padding: 24,
        //       backgroundColor: "#eaeaea"
    },
    //     title: {
    //     flexDirection: 'row',
    //     // justifyContent: 'space-around',
    //     //   marginTop: 0,
    //       paddingVertical: 8,
    //       padding: 20,
    //       textDecoration: 'none',
    //       borderWidth: 4,
    //       borderColor: "#20232a",
    //     //   borderRadius: 0,
    //       backgroundColor: "#61dafb",
    //       color: "#20232a",
    //     //   textAlign: "center",
    //       fontSize: 30,
    //       fontWeight: "bold"
    //     }
};


export default Home
