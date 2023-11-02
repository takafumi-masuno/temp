module.exports = {
  apps: [
    {
      name: 'bff-server',
      script: '/home/athome/projects/athome-csite/dist/apps/at-bff/main.js',
      exec_mode: 'cluster',
      instances: '-1',
      instance_var: 'BFF_SV',
      env_poc: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak01: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak02: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak03: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak04: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak05: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak06: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak51: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ak52: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ad01: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_ap01: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      env_prod: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'production',
      },
      env_stg: {
        PORT: 8080,
        PREFIX: 'csite-bff',
        NODE_ENV: 'staging',
      },
      out_file: '/var/log/apps/pm2-bff-out.log',
      error_file: '/var/log/apps/pm2-bff-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
    },
  ],
};
