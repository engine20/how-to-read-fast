const settings = new Map([
  ["text", ""],
  ["index", 0],
  [
    "Entryfield",
    new Map([
      ["input", ""],
      ["hidelable", true],
    ]),
  ],
  [
    "theme",
    new Map([
      ["bg", "#081119"], //#081119
      ["textbox", "#16212a"], //#16212a
      ["textprimary", "#7ebab5"], //#7ebab5
      ["textsecondary", "#0c171f"], //#0c171f
      ["texttertiary", "#12444d"], //#12444d
    ]),
  ],
]);

export const SetSetting = (Setting, Value) => {
  settings.set(Setting, Value);
  //console.log("Setting Change: " + Setting + ", " + Value);
};
export const GetSetting = (Setting) => {
  return settings.get(Setting);
};
