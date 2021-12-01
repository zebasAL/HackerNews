import moment from 'moment';

const date = (unixTimeStamp) => {
  const dateObject = new Date(unixTimeStamp * 1000);
  const humanDateFormat = dateObject.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }); // 2021-30-11
  return moment(humanDateFormat).startOf('day').fromNow();
};

export default date;
