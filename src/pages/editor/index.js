import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {Container, Select, MenuItem, TextField} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ContentEditable from 'react-contenteditable';
import './style.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function Editor() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Enter a title');
  const [subtitle, setSubtitle] = useState('Enter a subtitle');
  const [appliedGroup, setAppliedGroup] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [points, setPoints] = useState(0);
  const [imageData, setImageData] = useState([]);

  const handleEditorChange = (e) => {
    setContent(e);
    setImageData(
      e.split('"').filter((element) => element.startsWith('data:image')),
    );
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setKeywords([...keywords, value]);
    setValue('');
  };

  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />

      <Container>
        <div className='top-section'>
          <div>
            <div>
              <ContentEditable
                className='ce-title'
                html={title}
                disabled={false}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <ContentEditable
                className='ce-sub-title'
                html={subtitle}
                disabled={false}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>
          <div className='flex-buttons-publish'>
            <button className='flex-button preview'>
              {' '}
              <VisibilityIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Preview</span>
            </button>
            <button className='flex-button publish'>
              <PublishIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Publish</span>
            </button>
          </div>
        </div>
        <div className='container'>
          <div className='editor-side'>
            <SunEditor
              setOptions={{
                height: 200,
                buttonList: [
                  ['bold', 'italic', 'underline'],
                  ['list'],
                  ['fontColor'],
                  ['fontSize'],
                  ['font', 'align'],
                  ['video', 'image', 'link', 'audio'],
                ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              }}
              onChange={handleEditorChange}
            />
          </div>

          <div className='options-side'>
            <div>
              <Select
                labelId='demo-customized-select-label'
                id='demo-customized-select'
                value={0}
                onChange={(e) => {
                  setCategories([...categories, e.target.value]);
                }}
                fullWidth>
                <MenuItem value={0}>
                  {categories.length > 0
                    ? categories.map((element, index) => {
                        return (
                          <Chip
                            label={element}
                            key={index}
                            className='chip-style'
                            onDelete={() => {
                              setCategories(
                                categories.filter((value) => value !== element),
                              );
                            }}
                          />
                        );
                      })
                    : 'Select a category'}
                </MenuItem>
                <MenuItem value={'CFG Session'}>CFG Session</MenuItem>
                <MenuItem value={'Events'}>Events</MenuItem>
                <MenuItem value={'Quiz'}>Quiz</MenuItem>
                <MenuItem value={'Rewards'}>Rewards</MenuItem>
                <MenuItem value={'CFG Tools'}>CFG Tools</MenuItem>
              </Select>
            </div>
            <br />

            <div>
              <TextField
                variant='filled'
                value={appliedGroup}
                onChange={(e) => setAppliedGroup(e.target.value)}
                fullWidth
                label='Apply to Groups'
                required
              />
            </div>

            <br />
            <div>
              {keywords.map((element, index) => {
                return (
                  <Chip
                    label={element}
                    key={index}
                    className='chip-style'
                    onDelete={() => {
                      setKeywords(
                        keywords.filter((value) => value !== element),
                      );
                    }}
                  />
                );
              })}
            </div>
            <div>
              <form onSubmit={handleKeywordSubmit}>
                <TextField
                  variant='filled'
                  value={value}
                  onSubmit={(e) => setKeywords([...keywords, e.target.value])}
                  onChange={(e) => setValue(e.target.value)}
                  fullWidth
                  label='Key words'
                />
              </form>
            </div>

            <br />
            <div className='dates'>
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={startDate}
                onChange={(e) => setStartDate(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                label='End Date'
                value={endDate}
                onChange={(e) => setEndDate(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
            <br />
            <div>
              <TextField
                variant='filled'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                label='Status'
                required
              />
            </div>
            <br />
            <div>
              <TextField
                type='number'
                variant='filled'
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                fullWidth
                label='Points'
                required
              />
            </div>
            <br />
            <div>
              <div style={{fontSize: '20px', fontWeight: 600}}>
                Featured Image
              </div>
              <div style={{display: 'flex'}}>
                {imageData.map((element, index) => {
                  return (
                    <div key={index} className='image-preview'>
                      <img src={element} alt='image data' />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
