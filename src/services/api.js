import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/paper/get_paper_list?${stringify(params)}`);
  return result;
}

export async function getPaperList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/paper/get_paper_list?${stringify(params)}`);
  return result;
}

export async function getItemListByPaperId(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/paper/get_item_list_by_paper_id?${stringify(params)}`);
  return result;
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getFakePointTree() {
  return request('/api/point_tree/renjiao_A')
}

export async function getFakeQuestions(params) {
  console.log(params);
  const selectedKeys = params.selectedKeys.length?params.selectedKeys[0]:'358112';
  const region = params.filterCondition.region;
  const response = request('http://127.0.0.1:50218/filtered_items/', {
    method:'GET',
    params:{
      selectedKeys:selectedKeys,
      currentPage:params.currentPage,
      pageSize:params.pageSize,
      ...params.filterCondition
    }
  });
  return response
}

export async function searchByOcr(params) {
  
}
