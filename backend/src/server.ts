import cluster from 'cluster'
import os from 'os'


const cpus = os.availableParallelism()

console.log(cpus);
