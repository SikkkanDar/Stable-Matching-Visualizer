class ProcessCapture {
  constructor() {
    this.history = [];
    this.index = {
      start: null,
      end: null,
    };
  }

  beginProcess() {
    this.index.start = this.history.length;
  }
  endProcess() {
    this.index.end = this.history.length;
  }
  addProcess(process, content) {
    this.history.push({ process, content });
  }
  getBefore() {
    return this.history.slice(0, this.index.start);
  }
  getCurrent() {
    return this.history.slice(this.index.start, this.index.end);
  }
  getAfter() {
    return this.history.slice(this.index.end);
  }
}

class Entity {
  constructor(parent, name, preferences) {
    this.parent = parent;
    this.name = name;
    this.partner = null;
    this.preferencesIndex = [];
    this.preferencesName = preferences;
    this.rejects = [];

    // Instead of the names stored into the preference list, their indices will be stored instead.
    for (name of preferences) {
      this.preferencesIndex.push(this.parent.getIndexByName(name));
    }
  }

  allotPartner(entity) {
    if (this.partner == null) return true;
    let partnerIndex = this.parent.getIndexByName(this.partner.name);
    let otherIndex = this.parent.getIndexByName(entity.name);
    if (
      this.preferencesIndex.indexOf(partnerIndex) >
      this.preferencesIndex.indexOf(otherIndex)
    ) {
      return true;
    }
    return false;
  }

  addRejection(entity) {
    entity.rejects.push(this.parent.getIndexByName(this.name));
    this.rejects.push(this.parent.getIndexByName(entity.name));
  }

  getNonRejectedPreferenceIndex() {
    for (let index = 0; index < this.preferencesIndex.length; index++) {
      if (this.rejects.indexOf(this.preferencesIndex[index]) === -1)
        return this.preferencesIndex[index];
    }
    return -1;
  }
}

class SMPAlgo {
  constructor(config, nameIndexMap) {
    this.capture = new ProcessCapture();
    this.nameIndex = nameIndexMap ? nameIndexMap : null;
    this.male = [];
    this.female = [];
    this.single = [];
    this.nosolution = [];

    // This iteration prepares a dictionary for O(1) time complexity on later lookups.
    if (Object.keys(this.nameIndex).length === 0) {
      for (let group in config) {
        for (let index = 0; index < config[group].length; index++) {
          let { name } = config[group][index];
          this.nameIndex[name] = index;
        }
      }
    }
    // Instantiate all males and also put them on the single array.
    for (let entity of config.male) {
      let { name, preferences } = entity;
      this.male.push(new Entity(this, name, preferences));
      this.single.push(this.male[this.male.length - 1]);
    }
    // Instantiate all females.
    for (let entity of config.female) {
      let { name, preferences } = entity;
      this.female.push(new Entity(this, name, preferences));
    }
  }

  engage(male, female) {
    male.partner = female;
    female.partner = male;
  }
  // Checks whether algo is finished or not!
  isDone() {
    return this.single.length === 0 ? true : false;
  }
  // Returns the index of any entity regardless of what group it belongs to in O(1) time
  // referring to either male or female array of this object.
  getIndexByName(name) {
    return this.nameIndex[name];
  }

  algoIterate() {
    if (this.isDone()) return;
    this.capture.beginProcess();
    let male = this.single[0];
    let female = this.female[male.getNonRejectedPreferenceIndex()];
    if (male.rejects.length === this.female.length) {
      this.nosolution.push(this.single.shift());
      return;
    }
    this.capture.addProcess("start", { male, female });
    if (female.partner === null) {
      this.engage(male, female);
      this.single.shift();
      this.capture.addProcess("engage", { male, female });
    } else if (female.partner) {
      let curPartner = female.partner;
      if (female.allotPartner(male)) {
        curPartner.addRejection(curPartner.partner);
        curPartner.partner = null;
        this.single.push(this.male[this.getIndexByName(curPartner.name)]);
        this.engage(male, female);
        this.single.shift();
        // Male in break refers to the new partner of this female.
        this.capture.addProcess("break", { male, female, dumped: curPartner });
      } else {
        // Otherwise the new male is rejected completely by the female.
        male.addRejection(female);
        this.capture.addProcess("reject", { male, female });
      }
    }
    this.capture.addProcess("done", { male, female });
    this.capture.endProcess();
  }
}

export { ProcessCapture, SMPAlgo, Entity };
