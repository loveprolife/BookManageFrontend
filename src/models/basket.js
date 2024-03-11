import { getResourceList } from '@/services/api';
import { setCookie, getCookie, checkCookie } from '@/utils/utils';

// 从cookie里加载
export default {
  namespace: 'basket',

  state: {
    resourceList: [],
  },

  effects: {
    *fetchResource(_, { call, put }) {
      const response = yield call(getResourceList);
      yield put({
        type: 'saveResource',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveResource(state, action) {
        console.log(action.payload);
        setCookie('basket_list', JSON.stringify(action.payload), '/');
      return {
        ...state,
        resourceList: action.payload,
      };
    },
  },
};
