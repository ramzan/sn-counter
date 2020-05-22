import ComponentManager from 'sn-components-api';

const CounterDelimiter = "\n";
const defaultCounter = {title: "", value: 0, step: 0, color: "light-blue"}; 

export default class CounterManager {

  /* Singleton */
  static instance = null;
  static get() {
    if (this.instance == null) { this.instance = new CounterManager(); }
    return this.instance;
  }

  initiateBridge() {
    var permissions = [
      {
        name: "stream-context-item"
      }
    ]

    this.componentManager = new ComponentManager(permissions, () => {
      // on ready
      this.onReady && this.onReady();
    });

    this.componentManager.streamContextItem((note) => {
      this.note = note;

      if(note.isMetadataUpdate) {
        return;
      }

      this.dataString = note.content.text;
      this.idCount = 0;
      this.reloadData();
      this.dataChangeHandler && this.dataChangeHandler(this.counters);
    });
  }

  getPlatform() {
    return this.componentManager.platform;
  }

  isMobile() {
    return this.componentManager && this.componentManager.environment === "mobile";
  }

  setOnReady(onReady) {
    this.onReady = onReady;
  }

  setDataChangeHandler(handler) {
    this.dataChangeHandler = handler;
  }

  parseRawCountersString(string) {
    this.idCount = 0;
    if(!string) {return []};
    // Remove invalid entires then add default propertites if any are missing
    let counters = string.split(CounterDelimiter).map(x => {
      let counter = "";
      try {counter = JSON.parse(x)}
      catch(err) {console.error(`Error parsing ${x}`)}
      return counter;
    }).filter(counter => counter !== "").map(counter => ({...defaultCounter, ...this.setInfo(counter)}));
    
    return counters;
  }

  setInfo(counter) {
    counter.id = `${counter.title}${this.idCount++}`;
    counter.editable = false;
    return counter;
  }

  reloadData() {
    this.counters = this.parseRawCountersString(this.dataString);
  }

  getCounters() {
    if(!this.counter) {
      this.reloadData();
    }
    return this.counters;
  }

  addCounter(counter) {
    this.setInfo(counter);
    this.counters.push(counter);
    this.save();
    this.reloadData();
  }

  deleteCounter(counter) {
    const index = this.counters.indexOf(counter);
    this.counters.splice(index, 1);
    this.save();
    }

    //Counter Actions

    increment(counter) {
        const newValue = counter.value + counter.step;
        if(newValue > Number.MAX_SAFE_INTEGER) return;

        const index = this.counters.indexOf(counter);
        this.counters[index].value = newValue;
        this.save();
    }

    decrement(counter) {
        const newValue = counter.value - counter.step;
        if(newValue < Number.MIN_SAFE_INTEGER) return;

        const index = this.counters.indexOf(counter);
        this.counters[index].value = newValue;
        this.save();
    }

    editCounter(counter, newState) {
        const index = this.counters.findIndex(x => x.id === counter.id);
        console.log(this.counters[index]);
        this.counters[index] = {...counter, ...newState};
        console.log(this.counters[index]);
        this.save();
    }

    rearrange(destination, source) {
      const counters = Object.assign([], this.counters);
      const counter = this.counters[source.index];
      counters.splice(source.index, 1);
      counters.splice(destination.index, 0, counter);
      this.counters = counters;
      this.save();
    }

  buildHtmlPreview() {
    if(this.counters.length === 0) return "";
    let html = "<div><ul>";
    let counterPreviewLimit = 3;
    let i = 0;
    while(i < counterPreviewLimit && i < this.counters.length) {
      let counter = this.counters[i];
      html += `<li>${counter.title}: ${counter.value}</li>`;
      i += 1;
    }
    return html + "</ul></div>";
  }

  save() {
    this.dataString = this.counters.map((counter) => {
      const {title, value, step, color} = counter;
      return JSON.stringify({title, value, step, color});
    }).join(CounterDelimiter);

    if(this.note) {
      // Be sure to capture this object as a variable, as this.note may be reassigned in `streamContextItem`, so by the time
      // you modify it in the presave block, it may not be the same object anymore, so the presave values will not be applied to
      // the right object, and it will save incorrectly.
      let note = this.note;
      this.componentManager.saveItemWithPresave(note, () => {
        // required to build dynamic previews
        note.content.text = this.dataString;
        note.content.preview_html = this.buildHtmlPreview();
      });
    }
  }

}
