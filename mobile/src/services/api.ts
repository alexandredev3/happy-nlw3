import axios from 'axios';

/**
 * Podemos usar o IP da maquina na rede, que ele vai funcionar em todos os casos.
  * Se você estive no emulador do android ou iSO, ou no celula fisico, 
 */
const api = axios.create({
  baseURL: 'http://192.168.1.5:3333'
});

export default api;