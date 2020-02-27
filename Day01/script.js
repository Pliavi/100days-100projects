(function() {
  /**
   *
   * @param {String} csv - The CSV String
   * @param {String} separator - The separator character (eg. `,`, `;`, `|`)
   * @param {Bool} hasHeader - Return values with header names instead of letters
   */
  function convertCSVToJSON(csv, separator = ";", hasHeader = false) {
    const splittedLines = csv
      .trim()
      .split(/\n/)
      .map(compatibilityFormat);

    const separatorToNotQuoted = new RegExp(
      `^${separator}|(?=[^"])${separator}(?=[^"])|${separator}$`
    );
    const csvArray = splittedLines.map(line =>{
      return line.split(separatorToNotQuoted)
    });

    if (hasHeader) {
      let result = null;
      const [header, ...csvArrayWithoutHeader] = csvArray;

      if (csvArrayWithoutHeader.length !== 0) {
        result = csvArrayWithoutHeader.map(line =>
          Object.fromEntries(
            header.map((title, titleIndex) => [
              title.trim(),
              line[titleIndex] ? line[titleIndex].trim() : ""
            ])
          )
        );
      }

      return JSON.stringify(result || "Write the body to start parsing...", null, " ");
    }

    return JSON.stringify(csvArray, null, " ");
  }

  /**
   *
   * @param {Array<String>} csvLines
   */
  function compatibilityFormat(line) {
    if (line.match(/^".*"$/)) {
      return line.replace(`""`, `\\\"`);
    }
    return line;
  }

  return (() => {
    const separatorInput = document.getElementById("separator-input");
    const hasHeaderCheckbox = document.getElementById("has-header-checkbox");
    const translatorBox = document.getElementById("translator-box");
    const resultBox = document.getElementById("result-box");
    const processText = () => {
      const csvText = translatorBox.value;
      const hasHeader = hasHeaderCheckbox.checked;
      const separator = separatorInput.value;
      if(separator.trim() === "") {
        separator = null 
      }

      resultBox.value = convertCSVToJSON(csvText, separator, hasHeader);
    }

    translatorBox.addEventListener("keyup", processText);
    separatorInput.addEventListener("keyup", processText);
    hasHeaderCheckbox.addEventListener("change", processText);
  })();
})();
