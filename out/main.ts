import fetch from 'isomorphic-fetch';
import { newClient } from './client';


const r = (c: () => {}) => {
    try {
      c();
    } catch (err) {
      // nop
    }
  };

const config = {foo: 'bar'};

console.log('Starting');
const spaceTradersClient = newClient(config);
r(() => spaceTradersClient.fleet.getMyShips());
config.foo = 'deadbeef';
r(() => spaceTradersClient.fleet.getMounts('punisher'));
config.foo = 'battleship';
r(() => spaceTradersClient.fleet.orbitShip('destiny'));
