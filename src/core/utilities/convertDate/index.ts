export const jalaliToUTCTimeStamp = (
  year: string | number,
  month: string | number | undefined,
  day: string | number | undefined,
) => {
  const format = new Intl.DateTimeFormat("en-u-ca-persian", {
    dateStyle: "short",
    timeZone: "UTC",
  });
  let g = new Date(Date.UTC(2000, Number(month), Number(day)));
  g = new Date(g.setUTCDate(g.getUTCDate() + 226867));
  const gY = g.getUTCFullYear() - 2000 + Number(year);
  g = new Date(
    (gY < 0 ? "-" : "+") +
      ("00000" + Math.abs(gY)).slice(-6) +
      "-" +
      ("0" + (g.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + g.getUTCDate()).slice(-2),
  );
  let [pM, pD, pY] = [...format.format(g).split("/")],
    i = 0;
  g = new Date(
    g.setUTCDate(
      g.getUTCDate() +
        ~~(
          Number(year) * 365.25 +
          Number(month) * 30.44 +
          Number(day) -
          Number(
            Number(pY.split(" ")[0]) * 365.25 +
              Number(pM) * 30.44 +
              Number(pD) * 1,
          )
        ) -
        2,
    ),
  );
  while (i < 4) {
    [pM, pD, pY] = [...format.format(g).split("/")];
    if (pD == day && pM == month && pY.split(" ")[0] == year) return +g;
    g = new Date(g.setUTCDate(g.getUTCDate() + 1));
    i++;
  }
  throw new Error("Invalid Persian Date!");
};
