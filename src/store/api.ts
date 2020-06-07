import { all, call, put, takeEvery, takeLatest, take, fork, select, PutEffect, CallEffect } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

const API_URL = 'https://api.stackexchange.com/2.2';
const SE_KEY = 'rIuzq2*mzfdBZY9LaQhCxQ((';

export function callApi(url) {
  const fetchUrl = `${API_URL}${url}&key=${SE_KEY} `;
  return fetch(fetchUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )
}

export function* fetchEntity(entity, apiFn, responseConverter, params, callbackUrl?: string): SagaIterator {
  yield put(entity.request(params));
  const {response, error} = yield call(apiFn, params)
  if (response) {
    yield put(entity.success(params, responseConverter(response)))
  }
  else
    yield put(entity.failure(params, error))
}