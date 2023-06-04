const dailyAmount = {
  1: 20,
  2: 69,
  3: 169,
};
const dayPerMonth = 30;

export const getWeight = (month) => {
  if (month >= 5) {
    return 2;
  }
  if (month >= 4) {
    return 1.75;
  }
  if (month >= 3) {
    return 1.5;
  }
  if (month >= 2) {
    return 1.25;
  }
  if (month >= 1) {
    return 1;
  }
  return 0;
};

export const caculateDailyPoint = (month, value) => {
  return dailyAmount[level] * getWeight(month);
};

export const caculatePoint = (month, level) => {
  return dailyAmount[level] * dayPerMonth * getWeight(month) * month;
};
