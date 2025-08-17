const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './';
const paths = {};

// Convert paths to work with tsconfig-paths
Object.entries(tsConfig.compilerOptions.paths).forEach(([key, values]) => {
  paths[key] = values.map(value => 
    value.replace('src/', '').replace('/*', '')
  );
});

tsConfigPaths.register({
  baseUrl,
  paths: paths,
  addMatchAll: false,
});
