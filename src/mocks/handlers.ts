import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/sample', () => {
    return HttpResponse.json({
      message: 'Test message',
    });
  }),
];
