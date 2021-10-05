// Storing indices of male & female occuring in opposite gender preferences array
import {
  maleNames,
  femaleNames,
  minimumEntityCount,
  maximumEntityCount,
  maximumCharCount,
} from "./arrangement.js";

const addMaleIndices = (male, female) => {
  let newMaleArray = [];
  male.forEach((elem) => {
    let { name, preferences } = elem;
    let index = [];
    female.forEach((val) => {
      val.preferences.forEach((oppElem, ind) => {
        if (oppElem === name) {
          index.push(ind);
        }
      });
    });
    let tempObj = {
      name,
      preferences,
      index,
    };
    newMaleArray.push(tempObj);
  });

  return newMaleArray;
};

const addFemaleIndices = (male, female) => {
  let newFemaleArray = [];
  female.forEach((elem) => {
    let { name, preferences } = elem;
    let index = [];
    male.forEach((val) => {
      val.preferences.forEach((oppElem, ind) => {
        if (oppElem === name) {
          index.push(ind);
        }
      });
    });
    let tempObj = {
      name,
      preferences,
      index,
    };
    newFemaleArray.push(tempObj);
  });

  return newFemaleArray;
};

// O(N2*M) -> O(N)
const removeColorAndToggle = (arr) => {
  let newArray = [];
  arr.forEach((elem) => {
    let { name, preferences, index } = elem;
    let tempObj = {
      name,
      preferences,
      index,
    };
    newArray.push(tempObj);
  });
  return newArray;
};

const removeMaleIndex = (male, female, ind, idx) => {
  male.forEach((elem) => {
    elem.index.forEach((val, j) => {
      if (ind[j] < val) {
        elem.index[j] = val - 1;
      }
    });
  });
  female.forEach((elem, i) => {
    elem.preferences.splice(ind[i], 1);
    elem.index.splice(idx, 1);
  });

  return {
    tempMale: male,
    tempFemale: female,
  };
};

const removeFemaleIndex = (male, female, ind, idx) => {
  female.forEach((elem) => {
    elem.index.forEach((val, j) => {
      if (ind[j] < val) {
        elem.index[j] = val - 1;
      }
    });
  });
  male.forEach((elem, i) => {
    elem.preferences.splice(ind[i], 1);
    elem.index.splice(idx, 1);
  });

  return {
    tempMale: male,
    tempFemale: female,
  };
};

const shuffleArray = (preferenceArr) => {
  let currentIndex = preferenceArr.length;
  let temporaryValue;
  let randomIndex;
  let mapIndex = {};

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = preferenceArr[currentIndex];
    preferenceArr[currentIndex] = preferenceArr[randomIndex];
    preferenceArr[randomIndex] = temporaryValue;
    mapIndex[preferenceArr[currentIndex]] = currentIndex;
  }
  return { preferenceArr, mapIndex };
};

const randomArraySized = (array, size) => {
  // Deep Clone: Used to prevent mutating the original array.
  let shuffledArray = shuffleArray(
    JSON.parse(JSON.stringify(array))
  ).preferenceArr;
  return shuffledArray.slice(0, size);
};

const addMaleItem = (maleArr, femaleArr) => {
  let nameMaleArr = [];
  let nameFemaleArr = [];
  maleArr.forEach((item) => {
    nameMaleArr.push(item.name);
  });
  femaleArr.forEach((item) => {
    nameFemaleArr.push(item.name);
  });
  let randomName = "";
  do {
    randomName = maleNames[Math.floor(Math.random() * maleNames.length)];
  } while (nameMaleArr.indexOf(randomName) !== -1);
  let { preferenceArr, mapIndex } = shuffleArray(nameFemaleArr);
  let indexArr = femaleArr.map((val) => {
    return maleArr.length;
  });
  let newMaleArr = [
    ...maleArr,
    {
      name: randomName,
      preferences: preferenceArr,
      index: indexArr,
    },
  ];
  let newFemaleArr = femaleArr.map((item) => {
    let tempPreference = [...item.preferences];
    tempPreference.push(randomName);
    let tempIndex = [...item.index];
    tempIndex.push(mapIndex[item.name]);
    return {
      name: item.name,
      preferences: tempPreference,
      index: tempIndex,
    };
  });
  return { newMaleArr, newFemaleArr };
};

const addFemaleItem = (maleArr, femaleArr) => {
  let nameMaleArr = [];
  let nameFemaleArr = [];
  maleArr.forEach((item) => {
    nameMaleArr.push(item.name);
  });
  femaleArr.forEach((item) => {
    nameFemaleArr.push(item.name);
  });
  let randomName = "";
  do {
    randomName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
  } while (nameFemaleArr.indexOf(randomName) !== -1);
  let { preferenceArr, mapIndex } = shuffleArray(nameMaleArr);
  let indexArr = maleArr.map((val) => {
    return femaleArr.length;
  });
  let newFemaleArr = [
    ...femaleArr,
    {
      name: randomName,
      preferences: preferenceArr,
      index: indexArr,
    },
  ];
  let newMaleArr = maleArr.map((item) => {
    let tempPreference = item.preferences;
    tempPreference.push(randomName);
    let tempIndex = item.index;
    tempIndex.push(mapIndex[item.name]);
    return {
      name: item.name,
      preferences: tempPreference,
      index: tempIndex,
    };
  });
  return { newMaleArr, newFemaleArr };
};

const randomConfigClick = () => {
  let range = maximumEntityCount - minimumEntityCount;
  let randomMaleCount =
    Math.floor(Math.random() * (range + 1)) + minimumEntityCount;
  let randomFemaleCount =
    Math.floor(Math.random() * (range + 1)) + minimumEntityCount;
  // Get the names for each group.
  let randomMaleNames = randomArraySized(maleNames, randomMaleCount);
  let randomFemaleNames = randomArraySized(femaleNames, randomFemaleCount);
  let randomMaleArr = randomMaleNames.map((item) => {
    let tempArr = shuffleArray(
      JSON.parse(JSON.stringify(randomFemaleNames))
    ).preferenceArr;
    return {
      name: item,
      preferences: tempArr,
    };
  });
  let randomFemaleArr = randomFemaleNames.map((item) => {
    let tempArr = shuffleArray(
      JSON.parse(JSON.stringify(randomMaleNames))
    ).preferenceArr;
    return {
      name: item,
      preferences: tempArr,
    };
  });
  let randomFinalMaleArr = addMaleIndices(randomMaleArr, randomFemaleArr);
  let randomFinalFemaleArr = addFemaleIndices(randomMaleArr, randomFemaleArr);
  return {
    randomFinalMaleArr,
    randomFinalFemaleArr,
  };
};

const isValidConfig = (maleArr, femaleArr) => {
  let maleName = maleArr.map((item) => item.name);
  let totalElements = [...maleArr, ...femaleArr];

  // Checks if all names are unique whether
  // they be on the same group or not.
  let totalElementsName = totalElements.map((elem) => elem.name);
  let set = new Set(totalElementsName);
  if (set.size !== totalElementsName.length) return false;
  let ct = { male: {}, female: {} };

  // This loop counts every object of every group and adds one for each time it counts it.
  for (let entity of totalElements) {
    let { name: name1, preferences } = entity;

    // if any required property is undefined then the configuration is invalid
    if (!entity || !name1 || !preferences) return false;
    let group1 = maleName.indexOf(name1) === -1 ? "female" : "male";

    ct[group1][name1] = !ct[group1][name1] ? 1 : ct[group1][name1] + 1;
    for (let name2 of preferences) {
      let group2 = group1 === "male" ? "female" : "male";
      ct[group2][name2] = !ct[group2][name2] ? 1 : ct[group2][name2] + 1;
    }
  }

  // For the configuration to be valid, all entities of the same group must have the same number of countings.
  for (let group in ct) {
    let counts = Object.values(ct[group]);
    if (!counts.every((x) => x === counts[0])) return false;
  }

  return true;
};

const userSaveFile = (data, filename, type) => {
  let file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

const validateJSONConfig = (config) => {
  let { male, female } = config;
  if (!male || !Array.isArray(male)) {
    const errorMessage = {
      message: "Missing male array in configuration object.",
    };
    throw errorMessage;
  }
  if (!female || !Array.isArray(female)) {
    const errorMessage = {
      message: "Missing female array in configuration object.",
    };
    throw errorMessage;
    // throw "Missing female array in configuration object.";
  }
  if (male.length < minimumEntityCount) {
    const errorMessage = {
      message: "Male array does not meet minimum length of required elements.",
    };
    throw errorMessage;
    // throw "Male array does not meet minimum length of required elements.";
  }
  if (male.length > maximumEntityCount) {
    const errorMessage = {
      message: "Male array exceeds maximum length of required elements.",
    };
    throw errorMessage;
    // throw "Male array exceeds maximum length of required elements.";
  }
  if (female.length < minimumEntityCount) {
    const errorMessage = {
      message:
        "Female array does not meet minimum length of required elements.",
    };
    throw errorMessage;
    // throw "Female array does not meet minimum length of required elements.";
  }
  if (female.length > maximumEntityCount) {
    const errorMessage = {
      message: "Female array exceeds maximum length of required elements.",
    };
    throw errorMessage;
    // throw "Female array exceeds maximum length of required elements.";
  }

  for (let entity of [...male, ...female]) {
    let { name, preferences, index } = entity;
    if (!name || !preferences || !index) {
      const errorMessage = {
        message: "An entity is missing required fields.",
      };
      throw errorMessage;
    }
    if (
      !(typeof name == "string" || name instanceof String) ||
      name.length > maximumCharCount ||
      /[^a-z]/gi.test(name)
    ) {
      const errorMessage = {
        message: "An entity has an invalid name.",
      };
      throw errorMessage;
      // throw "An entity has an invalid name.";
    }
    if (
      !Array.isArray(preferences) ||
      !preferences.every((x) => typeof x == "string" || x instanceof String)
    ) {
      const errorMessage = {
        message: "An entity has invalid preferences.",
      };
      throw errorMessage;
      // throw "An entity has invalid preferences.";
    }
    if (
      !Array.isArray(index) ||
      !index.every((x) => typeof x == "number" || x instanceof Number)
    ) {
      const errorMessage = {
        message: "An entity has invalid index array.",
      };
      throw errorMessage;
      // throw "An entity has invalid index array.";
    }
  }

  if (!isValidConfig(male, female)) {
    const errorMessage = {
      message:
        "The configuration is invalid due to inconsistencies in entity occurence.",
    };
    throw errorMessage;
    // throw "The configuration is invalid due to inconsistencies in entity occurence.";
  }
};

const nameIndexMapper = (config) => {
  let mapper = {};
  for (let group in config) {
    for (let index = 0; index < config[group].length; index++) {
      let { name } = config[group][index];
      mapper[name] = index;
    }
  }
  return mapper;
};

export {
  addMaleIndices,
  addFemaleIndices,
  removeColorAndToggle,
  removeFemaleIndex,
  removeMaleIndex,
  addMaleItem,
  addFemaleItem,
  randomConfigClick,
  isValidConfig,
  userSaveFile,
  validateJSONConfig,
  nameIndexMapper,
};
