export const getEnvironment = () => process.env.NODE_ENV

type Environment = typeof process.env.NODE_ENV
export const isEnv = (allowedEnvs: Environment[]) =>
  allowedEnvs.includes(getEnvironment())
