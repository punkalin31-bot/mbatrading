import type {NextConfig} from "next";
const config:NextConfig={poweredByHeader:false,allowedDevOrigins:["terminal.local"],turbopack:{root:process.cwd()}};
export default config;
