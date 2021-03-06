import React, { Component } from 'react';
import bold from './cfgToolbarImages/bold-text.png';
import underlineIcon from './cfgToolbarImages/underline.png'
import italicIcon from './cfgToolbarImages/italic.png';
import upperCase from './cfgToolbarImages/uppercase.png';
import lowerCase from './cfgToolbarImages/lowerCase.png';
import button from './cfgToolbarImages/Button.png'
import linkIcon from './cfgToolbarImages/link.png';
import iconImage from './cfgToolbarImages/photo.png';
import videoIcon from './cfgToolbarImages/video.png';
import fontImage from './cfgToolbarImages/font-color.png';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import './customToolbarOptions.css';

const customToolBarCss = "position: absolute;  display: block; width: 50%; top:-59px; box-shadow: none;border: none;outline: 0px;";

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
    }
  }

  componentDidMount() {
    console.log("here....")
    setTimeout(()=> {
      document.querySelectorAll(`.se-toolbar`)[0].setAttribute("style", customToolBarCss);   
      this.createCustomButtonInstance(lowerCase, 2, 'lower');
      this.createCustomButtonInstance(upperCase, 2, 'upper');
      this.createCustomButtonInstance(button, 10, 'custom');
      var totalToolbarElements =  document.querySelectorAll('.se-btn-module')
      var x = document.getElementsByClassName(`se-toolbar-separator-vertical`)
      var y = document.getElementsByClassName(`se-btn-module-border`)
      for(let i = 0; i < totalToolbarElements.length; i++){
        y[i].style.borderRadius = "0px";
        y[i].style.border = "1px solid #464444";
      }
      for (let i = 0; i < x.length; i++) {
        x[i].style.margin = "0px";
      }
      document.querySelector(`.se-btn-module:first-child`).setAttribute("style", "border: 1px solid black; border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius:0px;  border-top-right-radius:0px;");
      document.querySelector(`.se-btn-module:last-child`).setAttribute("style", "border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius:0px;  border-top-left-radius:0px; border: 1px solid black;");
    }, 200)
        
    this.setState({ detail: ''});
  }
  insertAfter= (referenceNode, newNode)=> {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  createCustomButtonInstance(image, position, functionality){
    var el = document.createElement("div");
    el.innerHTML = this.getCustomButtonHtml(image)
    el.onclick = ()=> {
      if(functionality === "lower")
        document.querySelector(`.sun-editor`).setAttribute("style", "text-transform: lowercase;")
      else if(functionality === "upper")  
        document.querySelector(`.sun-editor`).setAttribute("style", "text-transform: uppercase;")
    };
    var div =  document.querySelectorAll('.se-btn-module')[position]
    el.setAttribute("class", "se-btn-module se-btn-module-border");
    this.insertAfter(div, el);
  }

  getCustomButtonHtml = (image) => {
    return `<ul class="se-menu-list"><li><button type="button" class="se-btn _se_command_italic se-tooltip" data-command="italic" data-display="" tabindex="-1"><img className = "custom-image" src="${image}"><span class="se-tooltip-inner"><span class="se-tooltip-text">Italic<span class="se-shortcut">⌘+<span class="se-shortcut-key">I</span></span></span></span></button></li></ul>`;
  }

  handleEditor = (data) => {
    this.props.onChangeDetail(data)
  }
    
  render() {
    return (
      <SunEditor  
        defaultValue = {this.props.detail} 
        onChange = {this.handleEditor}
        setOptions = {{
          height: 500,
          toolbarWidth : "50%",
          mode : "inline",
          buttonList: [
            ['bold'],
            ['italic'],
            ['underline'],
            ['fontColor'],
            ['align'],
            ['list'],
            [ 'link'],
            ['image'],
            ['video']
          ],      
          icons: {
            fontColor: `<img  src = "${fontImage}"/>`,
            bold: `<img  src = "${bold}"/>`,
            italic: `<img  src = "${italicIcon}"/>`,
            underline: `<img  src = "${underlineIcon}"/>`,
            video: `<img  src = "${videoIcon}"/>`,
            link: `<img  src = "${linkIcon}"/>`,
            image: `<img  src = "${iconImage}"/>`
          }
        }}
      />
    );
  }
}

export default RichTextEditor
