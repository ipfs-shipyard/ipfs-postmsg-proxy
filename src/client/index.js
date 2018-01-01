import { caller } from 'postmsg-rpc'
import callbackify from 'callbackify'
import createBlock from './block'
import createConfig from './config'
import createDag from './dag'
import createFiles from './files'
import createObject from './object'
import createPin from './pin'

export default (opts) => {
  const ipfs = {
    id: callbackify(caller('ipfs.id', opts)),
    version: callbackify(caller('ipfs.version', opts)),
    block: createBlock(opts),
    config: createConfig(opts),
    dag: createDag(opts),
    dht: {
      put: callbackify.variadic(caller('ipfs.dht.put', opts)),
      get: callbackify.variadic(caller('ipfs.dht.get', opts)),
      findprovs: callbackify.variadic(caller('ipfs.dht.findprovs', opts)),
      findpeer: callbackify.variadic(caller('ipfs.dht.findpeer', opts)),
      provide: callbackify.variadic(caller('ipfs.dht.provide', opts)),
      query: callbackify.variadic(caller('ipfs.dht.query', opts))
    },
    files: createFiles(opts),
    key: {
      gen: callbackify.variadic(caller('ipfs.key.gen', opts)),
      list: callbackify(caller('ipfs.key.list', opts)),
      rename: callbackify.variadic(caller('ipfs.key.rename', opts)),
      rm: callbackify.variadic(caller('ipfs.key.rm', opts))
    },
    object: createObject(opts),
    pin: createPin(opts),
    pubsub: {
      publish: callbackify.variadic(caller('ipfs.pubsub.publish', opts)),
      // subscribe: callbackify.variadic(caller('ipfs.pubsub.subscribe', opts)),
      // unsubscribe: callbackify.variadic(caller('ipfs.pubsub.unsubscribe', opts)),
      peers: callbackify.variadic(caller('ipfs.pubsub.peers', opts)),
      ls: callbackify.variadic(caller('ipfs.pubsub.ls', opts))
    },
    swarm: {
      peers: callbackify.variadic(caller('ipfs.swarm.peers', opts)),
      addrs: callbackify(caller('ipfs.swarm.addrs', opts)),
      localAddrs: callbackify(caller('ipfs.swarm.localAddrs', opts)),
      connect: callbackify.variadic(caller('ipfs.swarm.connect', opts)),
      disconnect: callbackify.variadic(caller('ipfs.swarm.disconnect', opts))
    }
  }

  // Aliases
  ipfs.add = ipfs.files.add
  ipfs.ls = ipfs.files.ls
  ipfs.lsReadableStream = ipfs.files.lsReadableStream
  ipfs.lsPullStream = ipfs.files.lsPullStream

  return ipfs
}
