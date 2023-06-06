const dailyAmount = {
  1: 20,
  2: 69,
  3: 169,
};
const dayPerMonth = 30;

export const getWeight = (month) => {
  if (month >= 12) {
    return 4;
  }
  if (month >= 11) {
    return 3.75;
  }
  if (month >= 10) {
    return 3.5;
  }
  if (month >= 9) {
    return 3.25;
  }
  if (month >= 8) {
    return 3;
  }
  if (month >= 7) {
    return 2.75;
  }
  if (month >= 6) {
    return 2.5;
  }
  if (month >= 5) {
    return 2.25;
  }
  if (month >= 4) {
    return 2;
  }
  if (month >= 3) {
    return 1.75;
  }
  if (month >= 2) {
    return 1.5;
  }
  if (month >= 1) {
    return 1.25;
  }
  return 0;
};

export const caculateDailyPoint = (month, level) => {
  return dailyAmount[level] * getWeight(month);
};

export const caculateMonthPoint = (month, level) => {
  return dailyAmount[level] * getWeight(month) * 30;
};
export const caculatePoint = (month, level) => {
  return dailyAmount[level] * dayPerMonth * getWeight(month) * month;
};
