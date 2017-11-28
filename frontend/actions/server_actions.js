import * as ServerUtil from '../util/server_api_util';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';

export const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

export const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

export const fetchServers = () => dispatch => (
  ServerUtil.fetchServers().then(servers => (
    dispatch(receiveServers(servers))
  ))
);

export const fetchServer = id => dispatch => (
  ServerUtil.fetchServer(id).then(server => (
    dispatch(receiveServer(server))
  ))
);

export const createServer = dm => dispatch => (
  ServerUtil.createServer(dm).then(server => (
    dispatch(receiveServer(server))
  ))
);

export const updateServer = dm => dispatch => (
  ServerUtil.updateServer(dm).then(server => (
    dispatch(receiveServer(server))
  ))
);