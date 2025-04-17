const enToBn = (num) => {
  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((char) =>
      /\d/.test(char) ? bengaliNumerals[parseInt(char)] : char
    )
    .join("");
};

export default enToBn;