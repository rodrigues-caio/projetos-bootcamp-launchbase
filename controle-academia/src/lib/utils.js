module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },
  date: function (timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();

    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`, // type ISO
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
};

// 10 - 11 = -1
// 10 - 10 = 0
// 11 - 10 = 1

// 5 - 4 = -1
// 5 - 5 = 0
// 6 - 5 = 1
