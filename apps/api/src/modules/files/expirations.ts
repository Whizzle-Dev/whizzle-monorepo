export enum Expirations {
  oneDay,
  oneHour,
  sevenDays,
}

export const getExpiration = (expiration: Expirations) => {
  switch (expiration) {
    case Expirations.oneDay:
      return Date.now() + 60 * 60 * 1000 * 24;
    case Expirations.oneHour:
      return Date.now() + 60 * 60 * 1000;
    case Expirations.sevenDays:
      return Date.now() + 60 * 60 * 1000 * 24 * 7;
    default:
      return Date.now() + 60 * 60 * 1000 * 24;
  }
};
