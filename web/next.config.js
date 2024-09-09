// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'], // Add or remove extensions as needed
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "connect-src 'self' https://web3quests.vercel.app https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.devnet.solana.com wss://api.devnet.solana.com/; style-src 'self' https://fonts.googleapis.com ; img-src 'self'  blob: data:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


// //@ts-check

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { composePlugins, withNx } = require('@nx/next');

// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   webpack: (config) => {
//     config.externals = [
//       ...(config.externals || []),
//       'bigint',
//       'node-gyp-build',
//     ];
//     return config;
//   },
//   nx: {
//     // Set this to true if you would like to use SVGR
//     // See: https://github.com/gregberge/svgr
//     svgr: false,
//   },
// };

// const plugins = [
//   // Add more Next.js plugins to this list if needed.
//   withNx,
// ];

// module.exports = composePlugins(...plugins)(nextConfig);
