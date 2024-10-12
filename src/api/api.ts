const BASE_URL = 'https://openmind-api.vercel.app/1-1';

type GetSubjectsTypes = {
  id?: string;
  limit?: number;
  offset?: string;
  sort?: string;
};

export async function getSubjects({
  id,
  limit = 8,
  offset = '',
  sort = 'time',
}: GetSubjectsTypes) {
  const subjectId = id ? `${id}/` : '';
  const query = id ? '' : `?limit=${limit}&offset=${offset}&sort=${sort}`;
  const response = await fetch(`${BASE_URL}/subjects/${subjectId}${query}`);
  if (!response.ok) {
    throw new Error('질문 대상 조회에 실패했습니다');
  }
  const body = await response.json();
  return body;
}

type FormDataTypes = {
  formData: string;
};

export async function postSubjects({ formData }: FormDataTypes) {
  const response = await fetch(`${BASE_URL}/subjects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('질문 대상 생성에 실패했습니다');
  }
  const body = await response.json();
  return body;
}

type GetSubjectsQuestionTypes = {
  id: string;
  limit: number;
  offset: number;
};

export async function getSubjectsQuestion({
  id,
  limit = 2,
  offset,
}: GetSubjectsQuestionTypes) {
  const subjectId = id;
  const query = `?limit=${limit}&offset=${offset ?? 0}`;
  const response = await fetch(
    `${BASE_URL}/subjects/${subjectId}/questions/${query}`
  );
  if (!response.ok) {
    throw new Error('질문 조회에 실패했습니다');
  }
  const body = await response.json();
  return body;
}

type IdFormDataTypes = {
  id: number;
  formData: string;
};

export async function postSubjectsQuestion({ id, formData }: IdFormDataTypes) {
  const response = await fetch(`${BASE_URL}/subjects/${id}/questions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('질문 생성에 실패하였습니다');
  }
  const body = await response.json();
  return body;
}

export async function deleteSubjects({ id }: { id: string }) {
  const response = await fetch(`${BASE_URL}/subjects/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('계정 삭제 중 문제가 발생했습니다.');
  }
  return response.ok;
}

export async function deleteQuestion(id: number) {
  const response = await fetch(`${BASE_URL}/questions/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('질문 삭제에 실패하였습니다');
  }
}

export async function postAnswer({ id, formData }: IdFormDataTypes) {
  const response = await fetch(`${BASE_URL}/questions/${id}/answers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('답변 생성에 실패하였습니다');
  }
  const body = await response.json();
  return body;
}

export async function putAnswer({ id, formData }: IdFormDataTypes) {
  const response = await fetch(`${BASE_URL}/answers/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('답변 수정에 실패하였습니다');
  }
  const body = await response.json();
  return body;
}

export async function deleteAnswer(id: number) {
  const response = await fetch(`${BASE_URL}/answers/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('답변 삭제에 실패하였습니다');
  }
}

type PostReactionOnQuestionTypes = {
  questionId: Number;
  formData: string;
};

export async function postReactionOnQuestion({
  questionId: id,
  formData,
}: PostReactionOnQuestionTypes) {
  const response = await fetch(`${BASE_URL}/questions/${id}/reaction/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('질문 리액션에 실패하였습니다');
  }
  const body = await response.json();
  return body;
}
