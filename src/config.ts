// app configuration
export const config = {
  region: process.env.REGION,
  isOffline: process.env.IS_OFFLINE === 'true' || false,
  tableName: process.env.TABLE_NAME,
};
