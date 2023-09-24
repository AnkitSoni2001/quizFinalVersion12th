import QuizContext from "./quizContext";
import { useState } from "react";

const QuizState = (props) => {
  const host = "http://localhost:1000"
  const quizsInitial = []
  const [quizs, setQuizs] = useState(quizsInitial)


  


  // Get quiz
  const getQuizs = async () => {
    // API Call 
    const response = await fetch(`${host}/api/quiz/fetchallquiz`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    
    console.log("GET ALL QUIZ" ,json[0].user);
    // console.log("authToken", localStorage.getItem('token'))
    window.value=json[0].user;
   
    setQuizs(json)
  }

  // Add a quiz
  const addQuiz = async (question, option1, option2, option3, option4, answer, title, mcq) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/quiz/addquiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({question, option1, option2, option3, option4, answer,title, mcq})
    });

    const quiz = await response.json();
    setQuizs(quizs.concat(quiz))
    // console.log(quiz, "ADD")

  }

  // Delete a Note
  const deleteQuiz = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/quiz/deletequiz/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    console.log(json, "DEL")
    const newQuizs = quizs.filter((quiz) => { return quiz._id !== id })
    setQuizs(newQuizs)
  }


  // Edit a Quiz
  const editQuiz = async (id, question, option1, option2, option3, option4, answer, title, mcq, code) => {
    // API Call 
    const response = await fetch(`${host}/api/quiz/updatequiz/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({question, option1, option2, option3, option4, answer, title, mcq, code})
    });
    const json = await response.json(); 
    console.log(json, "UPDATE")

     let newQuizs = JSON.parse(JSON.stringify(quizs))
    // Logic to edit in client
    for (let index = 0; index < newQuizs.length; index++) {
      const element = newQuizs[index];
      if (element._id === id) {
        newQuizs[index].question = question;
        newQuizs[index].option1 = option1;
        newQuizs[index].option2 = option2;
        newQuizs[index].option3 = option3;
        newQuizs[index].option4 = option4;
        newQuizs[index].answer = answer; 
        newQuizs[index].title = title; 
        newQuizs[index].mcq = mcq; 
        newQuizs[index].code = code; 
        break; 
      }
    }  
    setQuizs(newQuizs);
  }



  // Edit a Quiz
  const editCode = async ( code ) => {
    // API Call 
    const response = await fetch(`${host}/api/quiz/updatecode/${window.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ code })
    });
    const json = await response.json(); 
    console.log(json, "EDIT CODE")

     let newQuizs = JSON.parse(JSON.stringify(quizs))
    // Logic to edit in client
    for (let index = 0; index < newQuizs.length; index++) {
      const element = newQuizs[index];
      if (element.user === window.value) {
        newQuizs[index].code = code;
        break; 
      }
    }  
    setQuizs(newQuizs);
  }



  return (
    <QuizContext.Provider value={{ quizs, addQuiz, deleteQuiz, editQuiz, getQuizs, editCode}}>
      {props.children}
    </QuizContext.Provider>
  )

}
export default QuizState;

// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios
// import QuizContext from "./quizContext";
// const QuizState = (props) => {
//   const host = "http://localhost:1000";
//   const quizsInitial = [];
//   const [quizs, setQuizs] = useState(quizsInitial);

//   // Get quiz
//   const getQuizs = async () => {
//     try {
//       const response = await axios.get(`${host}/api/quiz/fetchallquiz`, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
//       const json = response.data;
//       console.log("GET ALL QUIZ", json[0].user);
//       window.value = json[0].user;
//       setQuizs(json);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   }

//   // Add a quiz
//   const addQuiz = async (question, option1, option2, option3, option4, answer, title, mcq) => {
//     try {
//       const response = await axios.post(`${host}/api/quiz/addquiz`, {
//         question,
//         option1,
//         option2,
//         option3,
//         option4,
//         answer,
//         title,
//         mcq
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
//       const quiz = response.data;
//       setQuizs([...quizs, quiz]);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   }

//   // Delete a Quiz
//   const deleteQuiz = async (id) => {
//     try {
//       await axios.delete(`${host}/api/quiz/deletequiz/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
//       const newQuizs = quizs.filter((quiz) => quiz._id !== id);
//       setQuizs(newQuizs);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   }

//   // Edit a Quiz
//   const editQuiz = async (id, question, option1, option2, option3, option4, answer, title, mcq, code) => {
//     try {
//       const response = await axios.put(`${host}/api/quiz/updatequiz/${id}`, {
//         question,
//         option1,
//         option2,
//         option3,
//         option4,
//         answer,
//         title,
//         mcq,
//         code
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
//       const updatedQuiz = response.data;
//       const updatedQuizs = quizs.map((quiz) => (quiz._id === id ? updatedQuiz : quiz));
//       setQuizs(updatedQuizs);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   }

//   // Edit Code for Quizzes
//   const editCode = async (code) => {
//     try {
//       const response = await axios.put(`${host}/api/quiz/updatecode/${window.value}`, { code }, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
//       const updatedCode = response.data;
//       const updatedQuizs = quizs.map((quiz) => {
//         if (quiz.user === window.value) {
//           quiz.code = updatedCode;
//         }
//         return quiz;
//       });
//       setQuizs(updatedQuizs);
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   }

//   //Fetch All Quiz
//   const fetchAllQuiz = async (message, setSeq) => {
//     try {
//       const response = await axios.get(`http://localhost:1000/api/quiz/fetchallquiznoauthentication/${message}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": localStorage.getItem('token')
//         }
//       });
  
//       const json = response.data;
//       // console.log(json, "FETCH");
//       setSeq('1');
//       setQuizs(json);
  
//       // Disable the button with id 'btn2'
//       const disableBtn = () => {
//         document.getElementById('btn2').disabled = true;
//       };
//       disableBtn();
//     } catch (error) {
//       console.error(error.message);
//       // Handle error here
//     }
//   };

//   // useEffect(() => {
//   //   getQuizs(); // Call getQuizs on component mount
//   // }, []);

//   return (
//     <QuizContext.Provider value={{ quizs, addQuiz, deleteQuiz, editQuiz, getQuizs, editCode, fetchAllQuiz }}>
//       {props.children}
//     </QuizContext.Provider>
//   )
// }

// export default QuizState;


// // import QuizContext from "./quizContext";
// // import { useState } from "react";

// // const QuizState = (props) => {
// //   const host = "http://localhost:1000"
// //   const quizsInitial = []
// //   const [quizs, setQuizs] = useState(quizsInitial)


// //   // Get quiz
// //   const getQuizs = async () => {
// //     // API Call 
// //     const response = await fetch(`${host}/api/quiz/fetchallquiz`, {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         "auth-token": localStorage.getItem('token')
// //       }
// //     });
// //     const json = await response.json()

// //     console.log("GET ALL QUIZ", json[0].user);
// //     // console.log("authToken", localStorage.getItem('token'))
// //     window.value = json[0].user;

// //     setQuizs(json)
// //   }

// //   // Add a quiz
// //   const addQuiz = async (question, option1, option2, option3, option4, answer, title, mcq) => {
// //     // TODO: API Call
// //     // API Call 
// //     const response = await fetch(`${host}/api/quiz/addquiz`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         "auth-token": localStorage.getItem('token')
// //       },
// //       body: JSON.stringify({ question, option1, option2, option3, option4, answer, title, mcq })
// //     });

// //     const quiz = await response.json();
// //     setQuizs(quizs.concat(quiz))
// //     // console.log(quiz, "ADD")

// //   }

// //   // Delete a Note
// //   const deleteQuiz = async (id) => {
// //     // API Call
// //     const response = await fetch(`${host}/api/quiz/deletequiz/${id}`, {
// //       method: 'DELETE',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         "auth-token": localStorage.getItem('token')
// //       }
// //     });
// //     const json = response.json();
// //     console.log(json, "DEL")
// //     const newQuizs = quizs.filter((quiz) => { return quiz._id !== id })
// //     setQuizs(newQuizs)
// //   }


// //   // Edit a Quiz
// //   const editQuiz = async (id, question, option1, option2, option3, option4, answer, title, mcq, code) => {
// //     // API Call 
// //     const response = await fetch(`${host}/api/quiz/updatequiz/${id}`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         "auth-token": localStorage.getItem('token')
// //       },
// //       body: JSON.stringify({ question, option1, option2, option3, option4, answer, title, mcq, code })
// //     });
// //     const json = await response.json();
// //     console.log(json, "UPDATE")

// //     let newQuizs = JSON.parse(JSON.stringify(quizs))
// //     // Logic to edit in client
// //     for (let index = 0; index < newQuizs.length; index++) {
// //       const element = newQuizs[index];
// //       if (element._id === id) {
// //         newQuizs[index].question = question;
// //         newQuizs[index].option1 = option1;
// //         newQuizs[index].option2 = option2;
// //         newQuizs[index].option3 = option3;
// //         newQuizs[index].option4 = option4;
// //         newQuizs[index].answer = answer;
// //         newQuizs[index].title = title;
// //         newQuizs[index].mcq = mcq;
// //         newQuizs[index].code = code;
// //         break;
// //       }
// //     }
// //     setQuizs(newQuizs);
// //   }



// //   // Edit a Quiz
// //   const editCode = async (code) => {
// //     // API Call 
// //     const response = await fetch(`${host}/api/quiz/updatecode/${window.value}`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         "auth-token": localStorage.getItem('token')
// //       },
// //       body: JSON.stringify({ code })
// //     });
// //     const json = await response.json();
// //     console.log(json, "EDIT CODE")

// //     let newQuizs = JSON.parse(JSON.stringify(quizs))
// //     // Logic to edit in client
// //     for (let index = 0; index < newQuizs.length; index++) {
// //       const element = newQuizs[index];
// //       if (element.user === window.value) {
// //         newQuizs[index].code = code;
// //         break;
// //       }
// //     }
// //     setQuizs(newQuizs);
// //   }



// //   return (
// //     <QuizContext.Provider value={{ quizs, addQuiz, deleteQuiz, editQuiz, getQuizs, editCode }}>
// //       {props.children}
// //     </QuizContext.Provider>
// //   )

// // }
// // export default QuizState;