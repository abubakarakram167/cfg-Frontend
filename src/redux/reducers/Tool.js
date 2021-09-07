import * as actions from 'redux/actions/action.types';

const INIT_STATE = {
  content: [],
  contentData: {},
  error: false,
  current: null,
  titles: [],
  titleCreation: false,
  currentContent: null,
  createdContent: null,
  editedContent: false,
  tools: [],
  selectedTool: null,
};
let payload = null;
const ToolReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.CREATE_TOOL:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          // currentContent: null,
        };
      }
      return {
        ...state,
        content: [...state.content, payload.content],
        // currentContent: null,
      };
    case actions.GET_TOOL_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        content: [...payload.data],
        // currentContent: null,
      };
    case actions.GET_ALL_TOOLS_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
        };
      }

      return {
        ...state,
        tools: Object.values(payload),
        // currentContent: null,
      };
    case actions.GET_LIST_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          // currentContent: null,
        };
      }
      return {
        ...state,
        contentData: payload,
        current: payload.data.rows[0],
        titles: payload.data.titles,
        // currentContent: null,
      };
    case actions.CREATE_TITLE:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          titleCreation: false,
          // currentContent: null,
        };
      }
      return {
        ...state,
        error: null,
        titleCreation: true,
        createdContent: payload.content,
        // currentContent: null,
      };
    case actions.UPDATE_CONTENT_DATA:
      payload = action.payload;
      if (payload.error) {
        return {
          ...state,
          error: true,
          editedContent: false,
          // currentContent: null,
        };
      }

      return {
        ...state,
        error: null,
        editedContent: true,
        currentContent: payload.content,
      };
    case actions.SET_SELECTED_TOOLS:
      const selected = state.tools.filter((tool) => {
        if (tool) {
          return tool.id === action.payload;
        }
      });
      return {
        ...state,
        selectedTool: selected[0],
      };
    default:
      return state;
  }
};

export default ToolReducer;
