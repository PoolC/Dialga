const DEFAULT_DEV_API_BASE_URL = 'https://dev.poolc.org/api';
const DEFAULT_PROD_API_BASE_URL = 'https://api.poolc.org';
const DEFAULT_DEV_FILE_URL = DEFAULT_DEV_API_BASE_URL;
const DEFAULT_PROD_FILE_URL = DEFAULT_PROD_API_BASE_URL;

const getEnv = (key: string, fallback: string) => {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
};

const getEnvNumber = (key: string, fallback: number) => {
  const value = Number(getEnv(key, String(fallback)));
  return Number.isFinite(value) ? value : fallback;
};

export const publicConfig = Object.freeze({
  apiBaseUrl: import.meta.env.DEV ? '/api/mincho' : getEnv('VITE_API_BASE_URL', DEFAULT_PROD_API_BASE_URL),
  fileUrl: getEnv('VITE_FILE_URL', import.meta.env.PROD ? DEFAULT_PROD_FILE_URL : DEFAULT_DEV_FILE_URL),
  maxFileSize: getEnvNumber('VITE_MAX_FILE_SIZE', 50_000_000),
  pks: Object.freeze({
    gitea: Object.freeze({
      url: getEnv('VITE_PKS_GITEA_URL', 'http://git.dev.poolc.org'),
      description: getEnv('VITE_PKS_GITEA_DESCRIPTION', 'git.dev.poolc.org'),
    }),
    argoCd: Object.freeze({
      url: getEnv('VITE_PKS_ARGOCD_URL', 'http://argocd.dev.poolc.org'),
      description: getEnv('VITE_PKS_ARGOCD_DESCRIPTION', 'argocd.dev.poolc.org'),
    }),
    grafana: Object.freeze({
      url: getEnv('VITE_PKS_GRAFANA_URL', 'http://mon.dev.poolc.org'),
      description: getEnv('VITE_PKS_GRAFANA_DESCRIPTION', 'mon.dev.poolc.org'),
    }),
    compile: Object.freeze({
      url: getEnv('VITE_PKS_COMPILE_URL', 'http://compile.dev.poolc.org'),
      description: getEnv('VITE_PKS_COMPILE_DESCRIPTION', 'compile.dev.poolc.org'),
    }),
    docs: Object.freeze({
      url: getEnv('VITE_PKS_DOCS_URL', 'https://github.com/PoolC/PKS-docs/tree/main'),
      description: getEnv('VITE_PKS_DOCS_DESCRIPTION', 'github.com/PoolC/PKS-docs'),
    }),
    userGuide: Object.freeze({
      url: getEnv('VITE_PKS_USER_GUIDE_URL', 'https://github.com/PoolC/PKS-docs/tree/main/docs/user-guides'),
      description: getEnv('VITE_PKS_USER_GUIDE_DESCRIPTION', 'github.com/PoolC/PKS-docs/docs/user-guides'),
    }),
    clusterServer: getEnv('VITE_PKS_CLUSTER_SERVER', 'https://165.132.131.121:6443'),
  }),
});
