import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryFakeList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/paper/get_paper_list?${stringify(params)}`);
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

export async function getCwList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/allteachercw/get_cw_list?${stringify(params)}`);
  return result;
}

export async function getPaperList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/history/get_paper_list?${stringify(params)}`);
  return result;
}

export async function getBasketList(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/history/get_basket_list?${stringify(params)}`);
  return result;
}

export async function getAllTeacherCwInfo(params) {
  console.log(params);
  let result = request(`http://127.0.0.1:50218/allteachercw/get_all_teacher_cw_info?${stringify(params)}`);
  return result;
}
