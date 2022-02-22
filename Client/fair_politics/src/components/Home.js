import React from 'react'
import Header from './Header';
import DiscussionCard from './DiscussionCard';
import FeedbackCard from './FeedbackCard';
const Home = () => {
    const DiscussionCards =
        [
            {
                Discussion_id: 1,
                owner_id: 1,
                title: "first discussion",
                text: "my first discussion that im going to talk about is dsadjsa;dl;ksa;d sDdsadDSad",
                Comments: [
                    {
                        Comment_id: 1,
                        user_id: 2,
                        Comment_title: "great first discussion!"
                    }
                ],
                Likes: [
                    {
                        user_id: 2
                    }
                ]
            },
            {
                Discussion_id: 2,
                owner_id: 1,
                title: "secound discussion",
                text: "my secound discussion that im going to talk about is dsadjsa;dl;ksa;d sDdsadDSad",
                Comments: [
                    {
                        Comment_id: 1,
                        user_id: 2,
                        Comment_title: "great secound discussion!"
                    }
                ],
                Likes: [
                    {
                        user_id: 2
                    },
                    {
                        user_id: 1
                    }
                ]
            }
        ];
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
                <DiscussionCard DiscussionCards={DiscussionCards} />
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
