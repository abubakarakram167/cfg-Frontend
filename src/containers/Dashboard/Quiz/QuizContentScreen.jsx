import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../../components/Header";
import { withStyles } from "@material-ui/styles";
import { makeStyles, Modal, TextField, Button } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import QuizModal from "./AddModal";
import AddNewQuestion from "./AddNewQuestion";
import AddFromBank from "./AddFromBank";
import _ from "lodash";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";

const useStyles = makeStyles((theme) => ({
  actions: {
    maxWidth: "170px",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "1.5rem",
    color: "#0c63e4",
    alignItems: "center",
  },
  question: {
    width: "fit-content",
  },
  answer:{
    maxWidth:'calc(100% - 70px)'
  },
  questionCard: {
    backgroundColor: "#f6f6f6",
    fontSize: "1.3rem",
    padding: "15px",
    border: "1px solid grey",
    // marginBottom:'10px'
  },
  editSection: {
    border: "1px solid grey",
    padding: "25px",
  },
  button: {
    borderRadius: "25px",
    marginRight: "15px",
    fontSize: "12px",
  },
  answerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "330px",
    margin: "25px 0",
  },
}));

const QuizContentScreen = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [selected, setSelected] = useState();
  const [editorState, setEditorState] = useState(
    EditorState.createWithText("")
  );
  const [detail, setDetail] = useState("");
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleOpenImport = () => {
    setOpenImport(true);
  };

  const handleClose = () => {
    setOpenImport(false);
    setOpenNew(false);
  };

  const handleDelete = (e) => {
    let temp = _.difference(questions, [e]);
    setQuestions(temp);
  };

  const handleAddNewQuestion = (e) => {
    let newQuestion = { question: "", Answers: { A: "", B: "", C: "", D: "" } };
    newQuestion.question = e;
    let temp = [...questions];
    temp.push(newQuestion);
    setQuestions(temp);
  };
  const handleImport = (e) => {
    setQuestions([...questions, ...e]);
  };

  const handleEdit = (e) => {
    setSelected(e);
  };
const handleAnswerDelete=(e)=>{
//   let newArr=[...questions]
//   let index=newArr.indexOf(selected)
//   newArr[index].answers.filter((a)=>a!==e)
// setQuestions(newArr);
// setSelected(newArr[index]);

}

  const onEditorStateChange = (editorState) => {
    console.log(
      "style",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    console.log("convertFromHTML", editorState.getCurrentInlineStyle());
    // console.log("convertFromHTML", editorState.getCurrentContent().getPlainText())
    console.log(
      "object",
      convertFromRaw(convertToRaw(editorState.getCurrentContent()))
    );
    setEditorState(editorState);
    setDetail(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <>
      <article>
        <Helmet>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
      </article>
      <Header />
      <main>
        <div className="dash-wrapper">
          <div className="row dash-session-header">
            <div className="col-md-8">
              <label style={{ fontSize: "1rem", fontWeight: 700 }}>
                CFG for secondary schools Quiz
              </label>
             
              <Button
          variant="contained"
          onClick={() => handleOpenNew()}
          style={{ backgroundColor: "red" }}
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutlinedIcon />}
        >
          Add new questions
        </Button>
      
              <Button
          variant="contained"
          onClick={() => handleOpenImport()}
          style={{ backgroundColor: "grey" }}
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutlinedIcon />}
        >
          Add question from questions
        </Button>
            </div>
            <div className="col-md-4" style={{ textAlign: "right" }}>
              <button className="button-title button_inline">
                <i className="fas fa-eye" /> preview
              </button>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn bg-primary btn-danger"
                  style={{
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    padding: "10px 0",
                    paddingLeft: "25px",
                    paddingRight: "5px",
                  }}
                >
                  <i className="fas fa-upload" /> Publish
                </button>
                <button
                  type="button"
                  className="btn bg-primary btn-danger dropdown-toggle dropdown-toggle-split"
                  style={{
                    paddingRight: "25px",
                    borderBottomRightRadius: "25px",
                    borderTopRightRadius: "25px",
                    borderLeft: "1px solid white",
                  }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </div>
            </div>
          </div>
          <QuizModal
            open={openNew}
            onClose={handleClose}
            title="Add New Question"
          >
            <AddNewQuestion
              onSave={(e) => handleAddNewQuestion(e)}
              onClose={handleClose}
            />
          </QuizModal>

          <QuizModal
            open={openImport}
            onClose={handleClose}
            title="Add Question From Question Bank"
          >
            <AddFromBank
              onImport={(e) => handleImport(e)}
              onClose={handleClose}
            />
          </QuizModal>
          <div className="row">
            {questions.map((q) => (
              <div style={{ marginBottom: "10px" }}>
                <div className={classes.questionCard}>
                  <div className="row">
                    <div className={classes.actions}>
                      <i
                        className="fas fa-edit"
                        onClick={() => handleEdit(q)}
                      />
                      <i className="fas fa-copy" />
                      <i
                        className="fas fa-trash"
                        style={{ color: "#EB1B29" }}
                        onClick={() => handleDelete(q)}
                      />
                    </div>
                    <div className={classes.question}>{q.question}</div>
                  </div>
                </div>
                {q == selected && (
                  <div className={classes.editSection}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      inputProps={{ style: { fontSize: "1.3rem" } }}
                      fullWidth
                      defaultValue={q.question}
                    />

                   
                    <Editor
  editorState={editorState}
  // defaultEditorState = {defaultState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={onEditorStateChange}
/>

                    <div className={classes.answerHeader}>
                      <h3>Answers</h3>{" "}
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red" }}
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddCircleOutlinedIcon />}
                      >
                        ADD NEW ANSWER
                      </Button>
                    </div>

                    {q.answers.map((a) => (
                      <div style={{padding:'10px'}}>
                        <div className={classes.questionCard} style={{border:'none'}}>
                          <div className="row">
                            <div className={classes.actions} style={{maxWidth:'50px'}} onClick={handleAnswerDelete(a)}>
                              <i
                                className="fas fa-trash"
                                style={{ color: "#EB1B29" }}
                              />
                            </div>
                            <TextField className={classes.answer} value={a}  variant="outlined"/>
                           
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default QuizContentScreen;
