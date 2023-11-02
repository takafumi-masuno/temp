module.exports = {
  apps: [
    {
      name: 'front-server-resort',
      script:
        '/home/athome/projects/athome-csite/dist/at-resort/server/main.js',
      exec_mode: 'cluster',
      instances: '-1',
      instance_var: 'FRONT_RESORT_SV',
      env_poc: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak01: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak02: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak03: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak04: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak05: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak06: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak51: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ak52: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ad01: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_ap01: {
        PORT: 8090,
        NODE_ENV: 'staging',
      },
      env_prod: {
        PORT: 8090,
        NODE_ENV: 'production',
      },
      out_file: '/var/log/apps/pm2-front-out-resort.log',
      error_file: '/var/log/apps/pm2-front-error-resort.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
    },
  ],
};
