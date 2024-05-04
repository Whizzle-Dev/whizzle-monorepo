import mitt from 'mitt';

type Events = {
  logout: { controlled?: boolean };
};
export const emitter = mitt<Events>();
